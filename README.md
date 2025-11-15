# Gilded Rose

This is my refactoring of the Gilded Rose kata in TypeScript.

## Setup

Install dependencies. The instructions are written using npm as the package manager but you can use your preferred package manager.

```sh
npm install
```

### Optional: Texttest setup

The files for running the Texttest approval tests are also included in the project. [Jump to the texttest section](#optional-run-the-texttest-approval-test)

## Compiling the project

Compiling the project can be done by running this command:

```sh
npm run compile
```

## Run the tests from the Command-Line

Running the tests can be done using this command:

```sh
npm test
```

or

```sh
npm run test
```

To run all tests in watch mode, run this:

```sh
npm run test:watch
```

To update snapshots, run this:

```sh
npm test -- -u
```

## Run the TextTest fixture from the Command-Line

A simulation for a single day can be run using this command:

```sh
npx ts-node test/golden-master-text-test.ts
```

or when compiled:

```sh
node test/golden-master-text-test.js
```

The amount of days can be provided as an argument:

```sh
npx ts-node test/golden-master-text-test.ts 10
```

or when compiled:

```sh
node test/golden-master-text-test.js 10
```

## Optional: Run the TextTest approval test

_requires python 3.6 or above_

### Setup

Follow the steps lined out in the [TextTest Readme](texttests/README.md) for setting up TextTest.

You might need to specify the Python executable and interpreter in [config.gr](texttests/config.gr).

If `which python` renders an output and `python --version` returns a version higher then 3.6, nothing needs to change. If only `which python3` returns a result, Change the `interpreter:python` line in [config.gr](texttests/config.gr) to `interpreter:python3` and also change `python -m venv venv` in [start_texttest.sh](start_texttest.sh) to `python3 -m venv venv`

### Run

The texttest can be run using the `start_texttest.sh` script in the root directory.

```sh
./start_texttest.sh
```

Tip: when running into issues with the texttest tests, try removing the venv folder in the project root:

```sh
rm -rf venv
```
