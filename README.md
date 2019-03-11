# CiscoCodingProblem

## Before Getting Started
This program is written in Node.js v10.15.3.

Before running the program, please make sure that you have installed Node.js and npm on your system.

The following document shows how to install and run Node.js and npm: https://www.taniarascia.com/how-to-install-and-use-node-js-and-npm-mac-and-windows/

## Description of the Program
We have a fictitious log file of JSON data that gives us information on files that were seen by users and whether it is safe or not (disposition).

JSON format:
```
ts:  timestamp
pt:  processing time
si:  session ID
uu:  user UUID
bg:  business UUID
sha: sha256 of the file
nm:  file name
ph:  path
dp:  disposition (valid values: MALICIOUS (1), CLEAN (2), UNKNOWN (3))
```

The JSON entries are not guaranteed to be valid.  Your task is to write an application that processes each valid line in the file, and then print out a list of unique extensions and the number of unique filenames for that extension.

For example, given the file:

{"ts":1551140352,"pt":55,"si":"3380fb19-0bdb-46ab-8781-e4c5cd448074","uu":"0dd24034-36d6-4b1e-a6c1-a52cc984f105","bg":"77e28e28-745a-474b-a496-3c0e086eaec0","
sha":"abb3ec1b8174043d5cd21d21fbe3c3fb3e9a11c7ceff3314a3222404feedda52","nm":"phkkrw.ext","ph":"/efvrfutgp/expgh/phkkrw","dp":2}
{"ts":1551140352,"pt":55,"si":"3380fb19-0bdb-46ab-8781-e4c5cd448074","uu":"0dd24034-36d6-4b1e-a6c1-a52cc984f105","bg":"77e28e28-745a-474b-a496-3c0e086eaec0","
sha":"abb3ec1b8174043d5cd21d21fbe3c3fb3e9a11c7ceff3314a3222404feedda52","nm":"asdf.pdf","ph":"/efvrfutgp/asdf.pdf","dp":2}
{"ts":1551140352,"pt":55,"si":"3380fb19-0bdb-46ab-8781-e4c5cd448074","uu":"0dd24034-36d6-4b1e-a6c1-a52cc984f105","bg":"77e28e28-745a-474b-a496-3c0e086eaec0","
sha":"abb3ec1b8174043d5cd21d21fbe3c3fb3e9a11c7ceff3314a3222404feedda52","nm":"phkkrw.ext","ph":"/efvrfutgp/expgh/phkkrw","dp":2}

We would expect the output:

ext: 2

pdf: 1

## Running the Program
To run the program, run the following command in the directory where the JSONParser.js is located.
```
node JSONParser.js [PATH_TO_JSON_FILE]
```

For example:
```
node JSONParser.js TestFiles/Generic.js
```
