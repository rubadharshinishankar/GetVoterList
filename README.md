# GetVoterList

Features:

1.File Reading: Utilizes the Node.js fs module to read a voter list from a text file.

2.Data Parsing: Processes the raw text data, splits strings, and replaces specific substrings to clean up and standardize the information.

3.Information Extraction: Extracts and organizes various voter details including serial numbers, voter numbers, names, guardian names, house numbers, ages, and genders.

4.Data Structuring: Structures the extracted data into a JSON format, ready for further processing or export.

5.Export to Excel (commented): Contains commented code that demonstrates how to export the processed data to an Excel file using the xlsx library.

Key Functions:

1.splitStr(str): Splits a string into an array based on a delimiter.

2.strReplaceNameAndHypen(str, strReplaceString): Cleans up and standardizes voter names and guardian names by removing unwanted characters and substrings.

How to Use:

step1:Download pdf using the link :

"https://voters.eci.gov.in/download-eroll"

step2:Convert pdf to text file using Power Automate AI builder:

"https://learn.microsoft.com/en-us/ai-builder/overview"

"https://learn.microsoft.com/en-us/power-automate/use-ai-builder"

step3 :Ensure Node.js is installed on your machine.

step 4:Install the required dependencies: 

   npm install xlsx path
   
step 5:Place your voter list file at the specified path.

step 6:Run the script using Node.js:

    node script.js

This project provides a foundational script for parsing and organizing voter list data, making it easier to manage and analyze large datasets.

