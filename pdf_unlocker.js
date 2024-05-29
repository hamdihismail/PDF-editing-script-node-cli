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

async function unlockPdf(inputFile){
	try {
		const pdfDoc = await PDFDocument.load(await readFile(inputFile));
		

		// fill form
		const form = pdfDoc.getForm()
		
    console.log(pdfDoc.getForm())

		const pdfBytes = await pdfDoc.save();
		await writeFile(inputFile,pdfBytes);
		
	} catch (error) {
		console.log(error);
	}
}

(async () => {
	init({ clear });
	cliInput.includes(`help`) && cli.showHelp(0);

	debug && log(flags);
	const file = cliInput.toString()

  unlockPdf(file)
  rl.close()
	
})();