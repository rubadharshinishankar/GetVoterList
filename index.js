const fs = require("node:fs");
const { get } = require("node:http");
const xlsx = require("xlsx");
const path = require("path");
let isWard = false;
let isPage2Completed = false;
let serialNo1 = "";
let serialNo2 = "";
let serialNo3 = "";
let voterNumber1 = "";
let voterNumber2 = "";
let voterNumber3 = "";
let voterName1 = "";
let voterName2 = "";
let voterName3 = "";
let voterGaurdian1 = "";
let voterGaurdian2 = "";
let voterGaurdian3 = "";
let voterHouse1 = "";
let voterHouse2 = "";
let voterHouse3 = "";
let voterAge1 = "";
let voterAge2 = "";
let voterAge3 = "";
let voterGender1 = "";
let voterGender2 = "";
let voterGender3 = "";
let availableInc = 0;

let myArray = [];

function splitStr(str) {
  // Function to split string
  let string = str.split('","');
  return string;
}

function strReplaceNameAndHypen(str, strReplaceString) {
  str = str.replace("-", "");
  let strValue = str.replace(strReplaceString, "");

  if (strValue.includes("Father Name")) {
    strValue = strValue.replace("Father Name : ", "");
  }

  if (strValue.includes(".")) {
    strValue = strValue.replace(".", "");
  }

  return strValue;
}

fs.readFile(
  "C:/Work/problems/voters-list/ElectionNorthSide.txt",
  "utf8",
  (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    let strArr = splitStr(data);
    let increment = 0;
    //console.log(strArr);
    strArr.forEach(function (item) {
      const substring = 'text":"';
      //console.log(item);

      if (item.indexOf(substring) !== -1) {
        let strValue = item.replace('text":"', "");
        if (!strValue.includes("boundingBox")) {
          if (!strValue.includes("Microsoft.Dynamics.CRM.expando")) {
            if (isPage2Completed && isWard) {
              // console.log(
              //   "isPage3Completed:" + isPage3Completed + "isWard:" + isWard
              // );
              if (strValue != "#") {
                if (
                  !strValue.includes("Electoral roll updated on") &&
                  !strValue.includes("Total Pages") &&
                  !strValue.includes("Section No and Name") &&
                  !strValue.includes("Assembly Constituency No and Name") &&
                  !strValue.includes("Part No. :")
                ) {
                  console.log(strValue);
                  if (increment == 0) {
                    serialNo1 = strValue;
                    //console.log("serialNo1:" + serialNo1);
                  } else if (increment == 1) {
                    voterNumber1 = strValue;
                    //console.log("voterNumber1:" + voterNumber1);
                  } else if (increment == 2) {
                    serialNo2 = strValue;
                    //console.log("serialNo2:" + serialNo2);
                  } else if (increment == 3) {
                    voterNumber2 = strValue;
                    //console.log("voterNumber2:" + voterNumber2);
                  } else if (increment == 4) {
                    serialNo3 = strValue;
                    //console.log("serialNo3:" + serialNo3);
                  } else if (increment == 5) {
                    voterNumber3 = strValue;
                    //console.log("voterNumber3:" + voterNumber3);
                  } else if (increment == 6) {
                    //strValue = strValue.replace("-", "");
                    //voterName1 = strValue.replace("Name :", "");
                    voterName1 = strReplaceNameAndHypen(strValue, "Name :");
                    //console.log("voterName1:" + voterName1);
                  } else if (increment == 7) {
                    //voterName2 = strValue;
                    voterName2 = strReplaceNameAndHypen(strValue, "Name :");
                    //console.log("voterName2:" + voterName2);
                  } else if (increment == 8) {
                    //voterName3 = strValue;
                    voterName3 = strReplaceNameAndHypen(strValue, "Name :");
                    //console.log("voterName3:" + voterName3);
                  } else {
                    // Set Gaurdian3 Value
                    if (
                      (strValue.includes("Father Name") ||
                        strValue.includes("Husband Name")) &&
                      voterGaurdian3 == "" &&
                      voterGaurdian2 != ""
                    ) {
                      if (strValue.includes("Father Name")) {
                        voterGaurdian3 = strReplaceNameAndHypen(
                          strValue,
                          "Father Name:"
                        );
                      } else if (strValue.includes("Husband Name")) {
                        voterGaurdian3 = strReplaceNameAndHypen(
                          strValue,
                          "Husband Name:"
                        );
                      }

                      //voterGaurdian3 = strValue;
                      // console.log("voterGaurdian3:" + voterGaurdian3);
                    }

                    // Set Gaurdian2 Value
                    if (
                      (strValue.includes("Father Name") ||
                        strValue.includes("Husband Name")) &&
                      voterGaurdian2 == "" &&
                      voterGaurdian1 != ""
                    ) {
                      if (strValue.includes("Father Name")) {
                        voterGaurdian2 = strReplaceNameAndHypen(
                          strValue,
                          "Father Name:"
                        );
                      } else if (strValue.includes("Husband Name")) {
                        voterGaurdian2 = strReplaceNameAndHypen(
                          strValue,
                          "Husband Name:"
                        );
                      }

                      //console.log("voterGaurdian2:" + voterGaurdian2);
                    }

                    // Set Gaurdian1 Value
                    if (
                      (strValue.includes("Father Name") ||
                        strValue.includes("Husband Name")) &&
                      voterGaurdian1 == ""
                    ) {
                      if (strValue.includes("Father Name")) {
                        voterGaurdian1 = strReplaceNameAndHypen(
                          strValue,
                          "Father Name:"
                        );
                      } else if (strValue.includes("Husband Name")) {
                        voterGaurdian1 = strReplaceNameAndHypen(
                          strValue,
                          "Husband Name:"
                        );
                      }
                      //console.log("voterGaurdian1:" + voterGaurdian1);
                    }

                    // Set House Number3 Value
                    if (
                      strValue.includes("House Number") &&
                      voterHouse2 != ""
                    ) {
                      voterHouse3 = strValue;
                      voterHouse3 = voterHouse3.replace("House Number : ", "");
                      //console.log("voterHouse3:" + voterHouse3);
                    }

                    // Set House Number2 Value
                    if (
                      strValue.includes("House Number") &&
                      voterHouse1 != "" &&
                      voterHouse3 == ""
                    ) {
                      voterHouse2 = strValue;
                      voterHouse2 = voterHouse2.replace("House Number : ", "");
                      //console.log("voterHouse2:" + voterHouse2);
                    }

                    // Set House Number1 Value
                    if (
                      strValue.includes("House Number") &&
                      voterHouse1 == ""
                    ) {
                      voterHouse1 = strValue;
                      voterHouse1 = voterHouse1.replace("House Number : ", "");
                      //console.log("voterHouse1:" + voterHouse1);
                    }

                    // set Age3
                    if (strValue.includes("Age") && voterAge2 != "") {
                      //voterAge1 = strValue;

                      const strArrAgeGender = strValue.split(":");
                      //console.log(strArrAgeGender);
                      voterAge3 = strArrAgeGender[1].replace("Gender ", "");
                      voterAge3 = voterAge3.replace("Gander", "");
                      voterGender3 = strArrAgeGender[2];

                      //console.log("voterAge2:" + voterAge3);
                      //console.log("voterGender2:" + voterGender3);
                    }

                    // set Age2
                    if (
                      strValue.includes("Age") &&
                      voterAge1 != "" &&
                      voterAge3 == ""
                    ) {
                      //voterAge1 = strValue;

                      const strArrAgeGender = strValue.split(":");
                      //console.log(strArrAgeGender);
                      voterAge2 = strArrAgeGender[1].replace("Gender ", "");
                      voterAge2 = voterAge2.replace("Gander", "");
                      voterGender2 = strArrAgeGender[2];

                      //console.log("voterAge2:" + voterAge2);
                      //console.log("voterGender2:" + voterGender2);
                    }

                    // set Age1
                    if (strValue.includes("Age") && voterAge1 == "") {
                      //voterAge1 = strValue;

                      const strArrAgeGender = strValue.split(":");
                      //console.log(strArrAgeGender);
                      voterAge1 = strArrAgeGender[1].replace("Gender ", "");
                      voterAge1 = voterAge1.replace("Gander", "");
                      voterGender1 = strArrAgeGender[2];

                      //console.log("voterAge1:" + voterAge1);
                      //console.log("voterGender1:" + voterGender1);
                    }

                    //console.log(myArray);
                  }
                  increment++;
                }
              }
            }

            if (isPage2Completed) {
              if (strValue.includes("Section No and Name")) {
                isWard = true;
                console.log("isWard set as true");
              }
            }
            if (strValue.includes("Page 2")) {
              isPage2Completed = true;
              console.log("isPage3Completed set as true");
            }

            if (strValue.includes("Available")) {
              availableInc++;
              console.log("availableInc:" + availableInc);
            }

            if (availableInc == 3) {
              if (serialNo1 != "") {
                myArray.push({
                  "serial No": serialNo1,
                  "voter Number": voterNumber1,
                  "voter Name": voterName1,
                  "voter Gaurdian": voterGaurdian1,
                  "voter House": voterHouse1,
                  "voter Age": voterAge1,
                  "voter Gender": voterGender1,
                });

                myArray.push({
                  "serial No": serialNo2,
                  "voter Number": voterNumber2,
                  "voter Name": voterName2,
                  "voter Gaurdian": voterGaurdian2,
                  "voter House": voterHouse2,
                  "voter Age": voterAge2,
                  "voter Gender": voterGender2,
                });
                myArray.push({
                  "serial No": serialNo3,
                  "voter Number": voterNumber3,
                  "voter Name": voterName3,
                  "voter Gaurdian": voterGaurdian3,
                  "voter House": voterHouse3,
                  "voter Age": voterAge3,
                  "voter Gender": voterGender3,
                });
              }
              serialNo1 = "";
              voterNumber1 = "";
              voterName1 = "";
              voterGaurdian1 = "";
              voterHouse1 = "";
              voterAge1 = "";
              voterGender1 = "";

              serialNo2 = "";
              voterNumber2 = "";
              voterName2 = "";
              voterGaurdian2 = "";
              voterHouse2 = "";
              voterAge2 = "";
              voterGender2 = "";

              serialNo3 = "";
              voterNumber3 = "";
              voterName3 = "";
              voterGaurdian3 = "";
              voterHouse3 = "";
              voterAge3 = "";
              voterGender3 = "";

              availableInc = 0;
              increment = 0;

              console.log("set availableInc:" + availableInc);
              //isWard = true;
              //isPage3Completed = true;
            }
          }
        }
      } // if (item.indexOf(substring) !== -1) { ends here
    }); // strArr.forEach(function (item) { ends here

    // const workbook = xlsx.utils.book_new();
    // const worksheet = xlsx.utils.json_to_sheet(myArray);

    // xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    // const filePath = path.join(__dirname, "VoterList.xlsx");
    // xlsx.writeFile(workbook, filePath);
  }
);
