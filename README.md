# 🔻 myITCSS 🔻

This is my take on ITCSS. I am deeply in love with ITCSS proposal by Harry Roberts as it provides a versatile and modular CSS architecture that has proved to be scalable and  maintainable.

ITCSS is not a framework but a methodology. So since then, I decided to follow his foundations while building and refining my own CSS base project.

Later I learnt the feature toggling system by Dani Fornells when I was reading his Inuit.CSS and so I brought it to my project. Since then, this has grown a lot, but as long as it doesn't spit out unwanted CSS, I don't delete any component, just evolve them.

Whenever I see an interesting take on one problem, I try to bring it in. References are escattered throughout the code, and place

This project has been growing, but
## References
This project is based mainly on:
  * [ITCSS](wwww.ITCSS.io) by [Harry Roberts](https://csswizardry.com/) and his approach in  [INUIT.css]([www.inuit.css](https://github.com/inuitcss)).
  * [HAITI.css](https://github.com/haiticss/haiticss) by Dani Fornells.
  * [BEM](http://getbem.com/) naming convention

## Folder structure  and code organization:
The only one thing I didn't like about the original ITCSS proposal was that the folder naming was alphabetically sortable. So the organization in the IDE didn't reflect the layer order that was one of the core foundations of the methodology. With a numeric prefix this issue is solved, and it makes the system clearer to those not so much experienced with ITCSS.

### What can I find inside those folders/layers?

0. **DEVTOOLS**: This folder is automatically compiled if the `config.develop` in gulpfile.js is `true`.
1. **SETTINGS**: The foundations of your project
2. **TOOLS**: Functions and mixins
3. **GENERIC**: Normalization and resets. This is the **first folder when we begin to actually produce CSS output.**
4. **ELEMENTS**: Styles for HTML tags.
5. **OBJECTS**: Layouts
6. **ANIMATIONS**:  Self-explanatory
7. **COMPONENTS**: Cosmetic styling for all the component. Every file should be autonomous. This is, that every component should use only variables defined in its own file. These variables can, obviously, refer to other project variables otuside. Addittionaly, all the components are disabled by default, but we overwrite (and activate the component) in `scss\01_settings\_settings__06-featureToggling.scss`
8. **MODES**: Theming
9. **WINS**: Those styles are supposed to be at the very end of the CSS output, so we are allowed to use `!important`. This folder is about overwrites for  vendors and utility classe.s

## Install and usage
Feel free to bring it into your own build workflow.
But if you want to use our compile, you can find an extremely simple `gulpfile.js` with some variables to define, the name of the entry file, the output folder and so on.

## Acknowledgements
Thanks to [Hugo Estévez](https://github.com/Hugoer) for all his help in not only the build part of the project (it's completely his work but some minor adjustments that probably have made it worse 😁).

He has taught me a lot about what to expect from a project, and his ideas after using this repo have made it much better than my initial intentions.