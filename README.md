# googledoc_link_frontend

Companion webapp for [tommyku/googledoc_link_bot](https://github.com/tommyku/googledoc_link_bot). Written as a progressive web app using web component.

## Feature

- Search links stored in your public Google spreadsheet document
- Works offline as a progressive web app

### Tasks

- [x] A working router
- [ ] Event bus element
- [ ] Retrieve Google Spreadsheet data dynamically
- [ ] Welcome page
- [ ] Index page
- [ ] Sorting
- [ ] Link search
- [ ] Marking links, like a bookmark (locally)
- [ ] Make it a PWA

## Usage

1. Clone this repo
1. Create a Google spreadsheet (and a Google form, optionally)
1. Fill in the URL for your public Google spreadsheet in `/src/config.js`
1. Commit it and push to master
1. Serve your site as a GitHub page
