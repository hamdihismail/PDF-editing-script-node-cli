# PDF Editing Script

## Project Overview: PDF Field Renamer and Unlocker
This project consists of two Node.js scripts designed to simplify PDF file manipulation. These scripts allow users to either rename form field identifiers in a PDF or unlock secured PDF files. They are run locally through the terminal, making PDF editing more accessible and straightforward.

### Key Features
#### PDF Field Renamer (`pdf_field_renamer.js`):
- **Rename form fields in a PDF.**
- **Handle multiple renaming operations efficiently.**
- **Provides details on existing form fields before renaming.**

#### PDF Unlocker (`pdf_unlocker.js`):
- **Remove restrictions from secured PDF files.**
- **Generate an unlocked version of the PDF for easier editing.**

### Prerequisites
- **Node.js** must be installed on your system. You can download it from [Node.js official website](https://nodejs.org/).
- Basic familiarity with using the terminal/command prompt.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/hamdihismail/PDF-editing-script-node-cli
   ```
2. Navigate to the project directory:
   ```bash
   cd pdf-editing-script
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Usage
#### Running the Scripts
- **Run the script using Node.js:**
   ```bash
   node <script_file> <path_to_pdf>
   ```
- **Replace <script_file> with either:**

pdf_field_renamer.js for renaming fields.
pdf_unlocker.js for unlocking PDFs.

**Example Commands:**

- **Renaming PDF fields:**
   ```bash
   node pdf_field_renamer.js ./path/to/your/pdf-file.pdf
   ```
- **You will be prompted to:**

   1. Enter the old field name to be replaced.
   2. Provide new field names (Will accept a list of one or more comma-separated names. Each entry will trigger a new pdf) for renaming.

- **Unlocking a secured PDF:**
   ```bash
   node pdf_unlocker.js ./path/to/your/locked-pdf-file.pdf
   ```
This will generate an unlocked version of the provided PDF.

### Project Structure
 ```bash
  PDF-editing-script-node-cli/
  ├── pdf_field_renamer.js   # Script for renaming PDF form fields
  ├── pdf_unlocker.js        # Script for unlocking secured PDFs
  ├── utils/
  │   ├── cli.js             # CLI helper
  │   ├── init.js            # Initialization utility
  │   ├── log.js             # Logging utility
  ├── package.json           # Project dependencies and metadata
  └── README.md              # Project documentation
 ```

### Objective
These scripts are designed to make PDF field manipulation and unlocking processes simple and efficient. They eliminate the need for specialized tools by leveraging Node.js to perform operations directly on the PDF file.

Contributing
```
  - Hamdi Ismail - Developer
```

License
This project is licensed under the MIT License.
