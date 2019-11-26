import React from 'react'
import { InlineIcon } from '@iconify/react';

import flaskIcon from '@iconify/icons-uil/flask';
import trophyIcon from '@iconify/icons-uil/trophy';
import bagIcon from '@iconify/icons-uil/bag';
import listUl from '@iconify/icons-uil/list-ul';

export const categories = {
  ALL: {
    key: 'ALL',
    text: 'ALL',
    icon: <InlineIcon color="#48496B" width="20" icon={listUl} />,
  },
  STUDY: {
    key: 'STUDY',
    text: 'Study',
    icon: <InlineIcon color="#FBA948" width="20" icon={flaskIcon} />,
  },
  SPORT: {
    key: 'SPORT',
    text: 'Sport',
    icon: <InlineIcon color="#758EEE" width="20" icon={trophyIcon} />,
  },
  WORK: {
    key: 'WORK',
    text: 'Work',
    icon: <InlineIcon color="#37FC7A" width="20" icon={bagIcon} />,
  },
};