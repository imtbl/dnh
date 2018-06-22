# dnh

> Touhou Danmakufu syntax highlighting for Visual Studio Code

![Syntax highlighting example][syntax-highlighting-example]

This is a simple [Visual Studio Code][vs-code] extension that adds syntax
highlighting for [Touhou Danmakufu][touhou-danmakufu] scripts (they usually
have the file ending `.dnh` or simply `.txt`).

## Install

Use `Quick Open` (<kbd>⌘</kbd> <kbd>P</kbd> on macOS,
<kbd>Ctrl</kbd> <kbd>P</kbd> on Windows/Linux) and run `ext install dnh` or
search and install it via the `Extensions` tab.

## Usage

Opening `.dnh` files with VS Code should automatically set the right syntax
highlighting, but you can also set it manually via `Change Language Mode`
(e.g., for `.txt` files where VS Code would default to plain text without
highlighting).

## Maintainer

[mserajnik][maintainer-url]

## Contribute

You are welcome to help out!

[Open an issue][issues-url] or submit a pull request.

## License

[MIT](LICENSE.md) © Michael Serajnik

## Credits

The syntax configuration was originally created by [drakeirving][drakeirving]
for Sublime Text. I have merely converted his TextMate grammar file to JSON
because I wanted to dabble with Touhou Danmakufu and prefer to stick to VS
Code.

The [original Sublime Text extension][sublime-danmakufu] has additional
features such as code completion and on-demand function documentation, so if
you are serious about developing Danmakufu scripts you should probably check
that out instead.

The extension icon is one of [Alphes' Touhou portraits][alphes-portraits] (free
to use and edit for non-commercial projects). I have simply made it square and
adjusted the size.

[syntax-highlighting-example]: https://github.com/mserajnik/dnh/raw/master/images/syntax-highlighting-example.png

[vs-code]: https://code.visualstudio.com/
[touhou-danmakufu]: https://en.touhouwiki.net/wiki/Touhou_Danmakufu
[drakeirving]: https://github.com/drakeirving
[sublime-danmakufu]: https://github.com/drakeirving/sublime-danmakufu
[alphes-portraits]: http://gensoukyou.1000.tv/dl.html

[maintainer-url]: https://github.com/mserajnik
[issues-url]: https://github.com/mserajnik/dnh/issues/new
