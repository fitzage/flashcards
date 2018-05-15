import React from 'react'
import styled from 'styled-components'
import { Constants } from 'expo'

export const Header = styled.View`
  height: ${Constants.statusBarHeight};
  background-color: #7282ff;
`

export const Input = styled.TextInput`
  border: 1px solid #cccccc;
  padding: 5px;
`

export const Screen = styled.View`
  padding: 20px;
  flex: 1;
`
