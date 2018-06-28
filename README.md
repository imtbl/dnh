<h1>
  <img
    src="https://github.com/mserajnik/dnh/raw/master/images/logo.png"
    alt="Drawing of Flandre Scarlet by Alphes"
    width="182">
  <br>
  dnh
  <a href="https://marketplace.visualstudio.com/items?itemName=mserajnik.dnh">
    <img
      src="https://img.shields.io/vscode-marketplace/v/mserajnik.dnh.svg"
      alt="dnh on the VS Code Marketplace">
  </a>
  <a href="https://travis-ci.com/mserajnik/dnh">
    <img src="https://travis-ci.com/mserajnik/dnh.svg" alt="Build status">
  </a>
  <a href="https://snyk.io/test/github/mserajnik/dnh">
    <img
      src="https://snyk.io/test/github/mserajnik/dnh/badge.svg"
      alt="Known vulnerabilities">
  </a>
  <a href="https://standardjs.com">
    <img
      src="https://img.shields.io/badge/code_style-standard-brightgreen.svg"
      alt="JavaScript Standard Style">
  </a>
</h1>

> Touhou Danmakufu extension for Visual Studio Code

![Syntax highlighting example][syntax-highlighting-example]

This is a simple [Visual Studio Code][vs-code] extension that adds some
features to make developing [Touhou Danmakufu][touhou-danmakufu] scripts more
comfortable. It currently features:

+ Syntax highlighting
+ Code completion for ph3 engine library functions, headers, routines and
  shot/item data
+ On-Demand documentation for ph3 engine library functions, headers, routines
  and shot/item data (on hover)
+ A variety of useful snippets

## Table of contents

- [Table of contents](#table-of-contents)
- [Install](#install)
  - [Updating](#updating)
- [Usage](#usage)
  - [Completion](#completion)
  - [Documentation](#documentation)
  - [Snippets](#snippets)
- [Maintainer](#maintainer)
- [Contribute](#contribute)
- [License](#license)
- [Credits](#credits)

## Install

Use `Quick Open` (<kbd>⌘</kbd> <kbd>P</kbd> on macOS,
<kbd>⌃</kbd> <kbd>P</kbd> on Windows/Linux) and run `ext install dnh` or
search and install it via the `Extensions` tab manually.

### Updating

VS Code should try to auto-update the extension at regular intervals, but you
can also check for available updates manually via
`Extensions: Check for Updates`.

## Usage

Opening `.dnh` files with VS Code should automatically set the correct syntax
highlighting and enable code completion, documentation and snippets, but you
can also set it manually via `Change Language Mode` (e.g., for `.txt` files
where VS Code would default to plain text without highlighting).

### Completion

Code completion is currently available for ph3 engine library functions,
headers, routines and shot/item data. The completion system is triggered simply
by typing and will automatically try to match the most relevant result from the
list. You can also navigate the list with
<kbd>↑</kbd> <kbd>↓</kbd> <kbd>→</kbd> <kbd>←</kbd> and select a completion to
use.

Hitting <kbd>Tab ⇥</kbd> will insert the selected completion. Some completions
(like functions) will have additional tab stops that allow you to navigate the
inserted code with <kbd>Tab ⇥</kbd>. This is, for example, useful for function
parameters.

Clicking on the `ⓘ` icon displays more information about the completion while
clicking on the `✕` icon hides this information again (depending on your
settings, the info window might be opened by default).

### Documentation

Documentation is available for the same types as completion (ph3 engine library
functions, headers, routines and shot/item data). It comes in the form of info
windows that are activated on hover and display similar information as when
clicking on the `ⓘ` icon on completion items.

### Snippets

Snippets work in a similar way as completions. They are also activated
automatically when typing and displayed in the same list as completion items.
Instead of displaying documentation in an info window, they show the code they
insert.

Selection and insertion also functions just like completions (with
<kbd>↑</kbd> <kbd>↓</kbd> <kbd>→</kbd> <kbd>←</kbd> and <kbd>Tab ⇥</kbd>).
Wherever necessary, snippets feature useful tab stops to make navigation easier
after inserting them.

They do generally have a higher priority than completions, which means that you
usually do not have to write the full keyword for VS Code to highlight the
correct snippet in the list.

The following is a list of keywords that are associated to a snippet:

+ `let`
+ `if`
+ `alternative`
+ `loop`
+ `while`
+ `ascent`
+ `local`
+ `yield` (type `y` and hit <kbd>Tab ⇥</kbd> instead of typing the full word)
+ `function`
+ `task`
+ `include`

## Maintainer

[mserajnik][maintainer-url]

## Contribute

You are welcome to help out!

[Open an issue][issues-url] or submit a pull request.

As an exception to the paragraph under _[License](#license)_ that mentions that
you are not allowed to use the file
`server/src/dictionary/files/functions.json` for your own software/projects:

You are hereby allowed to use this file for the purpose of _contributing_ to
[this project][project-url]. This includes forking this repository, making
changes and creating pull requests for those changes. You are __not__ allowed
to fork this repository for intentions other than contributing (e.g, creating
your own project without the intention to merge your changes back into
upstream) without removing the file immediately afterwards.

Additionally, any fork of this project that is created under the purpose of
contributing __must__ include this section and the paragraph under _License_ in
an unaltered state to assure that no one that creates forks/copies of your fork
or uses it or parts of it in their own software/projects is allowed to use
`server/src/dictionary/files/functions.json` without permission.

## License

[MIT](LICENSE.md) © Michael Serajnik

Explicitly excluded from the MIT license is the file
`server/src/dictionary/files/functions.json`. It contains a parsed version of
[Sparen of Iría][sparen]'s [ph3 function reference][sparen-function-reference]
and requires you to get his permission to use it. The file is therefore under
[no license][no-license] and you __do not__ have permission to use it in your
own software/projects.

## Credits

The syntax configuration was originally created by [drakeirving][drakeirving]
for his [Sublime Text extension][sublime-danmakufu]. I have merely converted
his TextMate grammar file to JSON, made some VS Code-specific adjustments and
expanded it a bit.

The built-in ph3 engine library function documentation is a parsed version of
[Sparen of Iría][sparen]'s [ph3 function reference][sparen-function-reference],
for which he was so kind as to give me [his permission](sparen_permission.md)
to use it. The only thing I did was transforming it into a format that is
easier for me to work with and applying some automatic text transformations.

If a function behaves differently than stated in this extension, please
cross-reference with Sparen's
[ph3 function reference][sparen-function-reference] and the
[official Danmakufu ph3 documentation][touhou-danmakufu-docs] (Japanese, though
Google Translate or other automatic translation services should work
_well enough_ in most cases) as they may be more up-to-date and/or contain
fixes for errors.

Sparen's [tutorials][sparen-tutorials] are brilliant and you should definitely
check them out if you want to get into Danmakufu scripting.

The extension icon (of which you can also see a higher resolution version of at
the top of this readme) is one of [Alphes' Touhou portraits][alphes-portraits]
(free to use and edit for non-commercial projects). I have simply made it
square and adjusted the size so it fits the VS Code Marketplace guidelines.

[syntax-highlighting-example]: https://github.com/mserajnik/dnh/raw/master/images/syntax-highlighting-example.png

[vs-code]: https://code.visualstudio.com/
[touhou-danmakufu]: https://en.touhouwiki.net/wiki/Touhou_Danmakufu
[sparen]: https://github.com/sparen
[sparen-function-reference]: https://sparen.github.io/ph3tutorials/docs.html
[no-license]: https://choosealicense.com/no-permission/
[drakeirving]: https://github.com/drakeirving
[sublime-danmakufu]: https://github.com/drakeirving/sublime-danmakufu
[touhou-danmakufu-docs]: http://www.geocities.co.jp/SiliconValley-Oakland/9951/pre/th_dnh_help_v3.html
[sparen-tutorials]: https://sparen.github.io/ph3tutorials/ph3tutorials.html
[alphes-portraits]: http://gensoukyou.1000.tv/dl.html

[maintainer-url]: https://github.com/mserajnik
[issues-url]: https://github.com/mserajnik/dnh/issues/new
[project-url]: https://github.com/mserajnik/dnh
