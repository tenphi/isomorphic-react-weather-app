import classNames from 'classnames';

// modName -> mod_name
function toKebabCase(str) {
  return str ? str
    .replace(/[A-Z]/g, s => `-${s.toLowerCase()}`)
    .replace(/$-/, '') : '';
}

function BEM(name) {
  let blockName = name || '';

  function block(newBlockName, mods = [], ...classes) {
    if (typeof newBlockName === 'string') {
      blockName = newBlockName;
    }

    const blockClass = blockName;
    let newMods = mods;

    if (mods) {
      newMods = classNames(mods)
        .split(' ')
        .filter(mod => mod)
        .map(mod => `${blockClass}--${toKebabCase(mod)}`)
        .join(' ');
    }

    return { className: [blockClass, newMods, classNames(classes)].join(' ').trim() };
  }

  function elem(elName, mods = [], ...classes) {
    const elemClass = `${blockName}__${elName}`;
    let newMods = mods;


    if (mods) {
      newMods = classNames(mods)
        .split(' ')
        .filter(mod => mod)
        .map(mod => `${elemClass}--${toKebabCase(mod)}`)
        .join(' ');
    }

    return { className: [elemClass, newMods, classNames(classes)].join(' ').trim() };
  }

  return { block, elem };
}

export default BEM;
