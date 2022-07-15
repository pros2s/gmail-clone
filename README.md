# Test gmail clone


  - [Get started](#get-started)
  - [Technology stack](#technology-stack)
  - [Dependencies](#dependencies)
  - [Project](#project)
    - [Start page](#start-page)
    - [Messages](#messages)
      - [Left side tools](#left-side-tools)
      - [Right side tools](#right-side-tools)
    - [Folders](#folders)
      - [Add folder](#add-folder)
    - [Toolbar](#toolbar)
      - [Compose](#compose)
      - [Select](#select)
      - [Search](#search)
## Get started
To open this project on your local server just clone or download it, install all dependencies and run.
```
git clone https://github.com/pros2s/gmail-clone.git
```
```
npm i
```
```
npm start
```
## Technology stack
- [Javascript](https://developer.mozilla.org/ru/docs/Web/JavaScript)
- [Typescript](https://www.typescriptlang.org/)
- [React](https://ru.reactjs.org/)
- [Redux](https://redux.js.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Redux Persist](https://github.com/rt2zz/redux-persist)
- [Scss](https://sass-scss.ru/)
## Dependencies
- [axios](https://github.com/axios/axios)
- [formik](https://formik.org/docs/overview)
- [classnames](https://github.com/JedWatson/classnames)
- [framer-motion](https://www.framer.com/motion/)
- [react-icons](https://react-icons.github.io/react-icons/)
- [react-router-dom](https://github.com/remix-run/react-router)
- [react-textarea-aoutosize](https://github.com/Andarist/react-textarea-autosize)
- [yup](https://github.com/jquense/yup)
- [uniqid](https://github.com/adamhalasz/uniqid)
## Project
### [Start page](https://github.com/pros2s/gmail-clone/tree/master/src/components/messageList)
Start page `Inbox` is a one of the main folders. Here you can see a list of the messages just like inside every folder.

### [Messages](https://github.com/pros2s/gmail-clone/tree/master/src/components/message)
Each message has `author`, `preview` and `date`(random). On message hover, left and right side tools become visible.
#### [Left side tools](https://github.com/pros2s/gmail-clone/tree/master/src/components/message/tools-left)
- Select
- Mark

When message selected, all of the tools become invisible and appear in the [toolbar](#toolbar) at the top of the page.

When message marked, it appears inside the `Marked` folder.

#### [Right side tools](https://github.com/pros2s/gmail-clone/tree/master/src/components/message/tools-right/toolsRight)
- Move to spam
- Delete
- [More tools](https://github.com/pros2s/gmail-clone/tree/master/src/components/message/tools-right/moreTools)
  - [Add to custom folder]((https://github.com/pros2s/gmail-clone/tree/master/src/components/message/tools-right/foldersModal))
  - [Remove from custom folder]((https://github.com/pros2s/gmail-clone/tree/master/src/components/message/tools-right/foldersModal))
  - Mark as read

Spam and Deleted messages are removed from the current folder and moved to the `Spam` or `Deleted`. These messages can be only come back to `Inbox` or `Sent`.

`Sent` messages can not be spam or marked as read


Inside more tools on click `add to`, opens list of the `custom folders` if they were created. In the custom folders' list choose any folder to add message and click on it. On click `remove from`, opens list of the custom folders that contains this message.`Mark as read` button changes color of the message.

### [Message page](https://github.com/pros2s/gmail-clone/tree/master/src/components/messageInfo)
Here is data of the message: theme, author, email, message text.

> On click on any folder, list of messages are removed from all of the folders and moved to `Inbox`. Don't open any message to prepend this.
### [Folders](https://github.com/pros2s/gmail-clone/tree/master/src/components/folders)
Here is list of all folders: main and custom. Main folders can only be switched.

Custom folders just like main folders but they can be edited or deleted.

#### Add folder
Maximum 8 folders. Empty or already exists folder could not be created(same with `editing` folder).

### [Toolbar](https://github.com/pros2s/gmail-clone/tree/master/src/components/toolbar)
#### [Compose](https://github.com/pros2s/gmail-clone/tree/master/src/components/toolbar/send)
On click compose, opens send message modal window. On send, message appears in the [`Sent`](#right-side-tools) with my name and current date.

#### [Select](https://github.com/pros2s/gmail-clone/tree/master/src/components/toolbar/select)
Selected messages can be marked as `read`, `unread`, `marked`, `unmarked`, `deleted` or `spam`. If choose only `read` messages, they can be marked as `unread` and backwards, same as `marked` -> `unmarked`.

#### [Search](https://github.com/pros2s/gmail-clone/tree/master/src/components/toolbar/search)
All messages are sorted by search value. Search can be done by name or preview.
