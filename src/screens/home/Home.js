import React, { useState } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import './Home.css';
import IconButton from '@material-ui/core/IconButton';
import { GridListTileBar } from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Header from '../../common/header/Header';

export default function HomePage() {
  const [homeProps, setHomeProps] = useState([
    {
      poster_url: '',
      title: '',
    },
  ]);

  return (
    <div className="grid-container">
      <div>
        <Header buttonName="LOGIN" />
      </div>
      <div className="headName">Upcoming Movies</div>
      <div className="upComing">
        <div className="rootGrid">
          <GridList className="gridList" cols={2.5}>
            {tileData.map((tile) => (
              <GridListTile key={tile.img}>
                <img src={tile.img} alt={tile.title} />
                <GridListTileBar
                  title={tile.title}
                  className={'titleBar' + ' ' + 'title'}
                  actionIcon={(
                    <IconButton aria-label={`star ${tile.title}`}>
                      <StarBorderIcon className="title" />
                    </IconButton>
                                )}
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
      </div>
      <div className="released"></div>
    </div>
  );
}

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *     cols: 2,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
