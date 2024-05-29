#!/usr/bin/env node

/**
 * pdf-lib
 * This app modifies pdf files
 *
 * @author Hamdi Ismail <http://www.hamdihismail.com>
 */

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');

const cliInput = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

const {PDFDocument} = require('pdf-lib');
const {readFile,writeFile} = require('fs/promises');
const chalk = require('chalk');
const readline = require('node:readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


async function createPdf(inputFile,oldId,newId){
	try {
		const pdfDoc = await PDFDocument.load(await readFile(inputFile));
		const fildIdentifier = inputFile.split('/').pop()
		const oldPath = inputFile.split('/')

		// Formatting the output file name
		const oldFileName = oldId.split(/[-_/]/).map((x)=>{
			if(x.length>4){
				return x.charAt(0).toUpperCase()+x.slice(1)
			} else return x.toUpperCase()
		}).join(' ')
		const newFileName = newId.split(/[-_/]/).map((x)=>{
			if(x.length>4){
				return x.charAt(0).toUpperCase()+x.slice(1)
			} else return x.toUpperCase()
		}).join(' ')
		let output = inputFile.replaceAll(oldFileName,newFileName)
		
		const outputName = output.split('/')
		// number of form fields
		const fieldNames = pdfDoc.getForm().getFields().map((f)=>f.getName())
		console.log('All fields: '+fieldNames.length);
		console.log(`Fields with ${oldId}: `+fieldNames.filter((f)=>f.includes(oldId)).length);
		console.log(fieldNames);
		const old = fieldNames.filter((f)=>f.includes(oldId))
		console.log(old);

		// fill form
		const form = pdfDoc.getForm()
		// // this updates the field name
		old.map((f)=>{
			try {
				if(f.includes('.')){
					if(f.split('.').length-1 === 1){
						form.getField(f).acroField.getParent().setPartialName(form.getField(f).acroField.getParent().getPartialName().replaceAll(oldId,newId))
					} else if(f.split('.').length-1 === 2){
						form.getField(f).acroField.getParent().getParent().setPartialName(form.getField(f).acroField.getParent().getParent().getPartialName().replaceAll(oldId,newId))
					} else if(f.split('.').length-1 === 3){
						form.getField(f).acroField.getParent().getParent().getParent().setPartialName(form.getField(f).acroField.getParent().getParent().getParent().getPartialName().replaceAll(oldId,newId))
					}
				} else {
					form.getField(f).acroField.setPartialName(form.getField(f).acroField.getPartialName().replaceAll(oldId,newId))			
				}
		} catch (error) {
		}			
		})
		const pdfBytes = await pdfDoc.save();
		await writeFile(output,pdfBytes);
		console.log(chalk.green(`PDF ${outputName[outputName.length-1]}, Successfully Created!`))
	} catch (error) {
		console.log(error);
	}
}

(async () => {
	init({ clear });
	cliInput.includes(`help`) && cli.showHelp(0);

	debug && log(flags);
	const file = cliInput.toString()
	let oldName = ''
	let newName = []
	const answer = rl.question('Enter the old field name \n\n',x=>{
		oldName = x
	console.log(`The old name is: ${oldName}`);
		rl.question('Enter the new field names separated by a "," \n\n',y=>{
		newName = y.split(',')
	console.log(`The new name is: ${newName.toString()}`);
		newName.map((val)=>createPdf(file,oldName,val))
		rl.close()
	})
	})
})();
