# googledoc_link_frontend

Companion webapp for [tommyku/googledoc_link_bot](https://github.com/tommyku/googledoc_link_bot). Written as a progressive web app using web component.

## Feature

- Search links stored in your public Google spreadsheet document
- Works offline as a progressive web app

### Tasks

- [x] A working router
- [x] Event bus element
- [x] Retrieve Google Spreadsheet data dynamically
- [x] Welcome page (add spreadsheet link, validate link, save to localStorage)
- [x] Help page (spreadsheet format)
- [x] Home page (list records)
- [ ] Home page load links progressively
- [ ] Search
- [ ] Marking links, like a bookmark (locally)
- [ ] Make it a PWA

## Usage

1. Clone this repo
1. Create a Google spreadsheet (and a Google form, optionally)
1. Fill in the URL for your public Google spreadsheet in `/src/config.js`
1. Commit it and push to master
1. Serve your site as a GitHub page

## Useful Information

- [Accessing a (new-style, public) Google sheet as JSON - Stack
  Overflow](https://stackoverflow.com/questions/30082277/accessing-a-new-style-public-google-sheet-as-json)
- [Bal Laedi Workshop: 【教學】Google Sheet get JSON (選擇worksheet) with Javascript](https://ballaediworkshop.blogspot.com/2017/08/google-sheet-get-json-worksheet-with.html)
