import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileCsv, faFolder, faFileImage, faFilePowerpoint, faFile,
  faFolderOpen, faImages, faFileExcel, faFileAlt, faFileCode,
} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import './App.sass';
import data from './data';

library.add(faFileCsv, faFolder, faFileImage, faFilePowerpoint, faFile,
  faFolderOpen, faImages, faFileExcel, faFileAlt, faFileCode);

const ICONS = [
  {
    ext: 'csv',
    iconName: 'file-csv',
    size: '1x',
    color: '',
  },
  {
    ext: 'png',
    iconName: 'file-image',
    size: '1x',
    color: '',
  },
  {
    ext: 'jpg',
    iconName: 'file-image',
    size: '1x',
    color: '',
  },
  {
    ext: 'svg',
    iconName: 'file-image',
    size: '1x',
    color: '',
  },
  {
    ext: 'jpeg',
    iconName: 'file-image',
    size: '1x',
    color: '',
  },
  {
    ext: 'ppt',
    iconName: 'file-powerpoint',
    size: '1x',
    color: '',
  },
  {
    ext: '',
    iconName: 'file',
    size: '1x',
    color: '',
  },
  {
    iconName: 'folder',
    name: 'folder',
    size: '1x',
    color: '',
  },
  {
    name: 'folderOpen',
    iconName: 'folder-open',
    size: '1x',
    color: '',
  },
];


class App extends PureComponent {
  state = {
    structure: [],
    icons: [],
    breadcrumbs: [{
      name: 'root',
      level: 0,
      parent: 0,
    }],
    search: '',
  }

  componentWillMount() {
    const { structure, icons } = this.props;
    if (structure) {
      this.setState({
        structure,
      });
    }
    this.setIcons(icons);
  }

  setIcons(icons) {
    if (icons === ICONS) {
      this.setState({
        icons,
      });
    } else {
      const mergeIcons = ICONS.map((icon) => {
        if (!icon.name) {
          const propIcon = icons.find(findIcon => findIcon.ext === icon.ext);
          if (propIcon) {
            return { ...icon, ...propIcon };
          }
        } else {
          const propIcon = icons.find(findIcon => findIcon.name === icon.name);
          if (propIcon) {
            return { ...icon, ...propIcon };
          }
        }
        return icon;
      });
      this.setState({
        icons: mergeIcons,
      });
    }
  }

  renderIcon = (ext) => {
    const { icons } = this.state;
    const icon = icons.find(findIcon => findIcon.ext === ext);
    if (icons.ext) {
      return <FontAwesomeIcon icon={icon.iconName} size={icon.size} color={icon.color} />;
    }
    return <FontAwesomeIcon icon={icon.iconName} size={icon.size} color={icon.color} />;
  }

  handleClickItem = item => (event) => {
    const { structure } = this.state;
    const { choiceMultiple } = this.props;
    if (choiceMultiple && event.ctrlKey) {
      const newStructure = structure.map((mapItem) => {
        if (mapItem.id === item.id) {
          return { ...item, chosen: !item.chosen };
        }
        return mapItem;
      });
      this.setState({
        structure: newStructure,
      });
    } else {
      const newStructure = structure.map((mapItem) => {
        if (mapItem.id === item.id) {
          return { ...item, chosen: !item.chosen };
        }
        if (mapItem.chosen) {
          return { ...mapItem, chosen: false };
        }
        return mapItem;
      });
      this.setState({
        structure: newStructure,
      });
    }
  }

  handleDbClickFolder = item => () => {
    const { breadcrumbs, structure } = this.state;
    this.setState({
      breadcrumbs: [...breadcrumbs, {
        level: item.level + 1,
        parent: item.id,
        name: item.name,
      }],
      structure: structure.map((mapItem) => {
        if (mapItem.chosen) { return { ...mapItem, chosen: false }; }
        return mapItem;
      }),
    });
  }

  handleClickBreadcrumb = breadcrumb => () => {
    const { breadcrumbs } = this.state;
    const indexBreadcrumb = breadcrumbs.indexOf(breadcrumb);
    this.setState({ breadcrumbs: breadcrumbs.slice(0, indexBreadcrumb + 1) });
  }

  handleInputSearch = ({ target }) => {
    this.setState({
      search: target.value,
    });
  }

  searchInList(list) {
    const { searchType } = this.props;
    const { search } = this.state;
    return list.filter((item) => {
      if (searchType === 'all') {
        return item.name.indexOf(search) !== -1;
      }
      if (search !== '' && searchType === 'exact') {
        return item.name === search;
      }
      if (searchType === 'startWith') {
        return item.name.indexOf(search) === 0;
      }
      return true;
    });
  }

  render() {
    const {
      structure, breadcrumbs, icons,
    } = this.state;
    const iconFolderOpen = icons.find(icon => icon.name === 'folderOpen');
    const listFiltered = structure.filter(
      item => item.level === breadcrumbs[breadcrumbs.length - 1].level
      && item.parent === breadcrumbs[breadcrumbs.length - 1].parent,
    ).sort(item => (item.type === 'folder' ? -1 : 0));
    const list = this.searchInList(listFiltered);
    return (
      <div className="app">
        File
        <div className="search-file">
          <input onInput={this.handleInputSearch} type="text" className="search-file-input" />
        </div>
        <ul className="breadcrumbs">
          <li className="breadcrumbs-item">
            <FontAwesomeIcon
              icon={iconFolderOpen.iconName}
              size={iconFolderOpen.size}
              color={iconFolderOpen.color}
            />
          </li>
          {breadcrumbs.map(item => (
            <li
              onClick={this.handleClickBreadcrumb(item)}
              key={item.level + item.parent}
              className="breadcrumbs-item"
            >
              {item.name}

            </li>
          ))}
        </ul>
        <ul className="list-files">
          {list.map(item => (
            <li
              key={item.id}
              onDoubleClick={item.type === 'folder' && item.enabled ? this.handleDbClickFolder(item) : undefined}
              onClick={item.enabled ? this.handleClickItem(item) : undefined}
              className={classNames('list-files-item', { 'list-files-item-active': item.chosen, 'list-files-item-disabled': !item.enabled })}
            >
              {' '}
              <span className="list-files-icon">
                {this.renderIcon(item.ext)}
              </span>
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

App.defaultProps = {
  searchType: 'all',
  choiceMultiple: true,
  structure: data,
  icons: ICONS,
};

App.propTypes = {
  searchType: PropTypes.string,
  choiceMultiple: PropTypes.bool,
  structure: PropTypes.arrayOf(PropTypes.object),
  icons: PropTypes.arrayOf(PropTypes.object),
};

export default App;
