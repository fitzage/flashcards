import React from 'react'
import styled from 'styled-components'
import { Constants } from 'expo'

export const Header = styled.View`
  height: ${Constants.statusBarHeight};
  background-color: #8171ff;
`

export const Input = styled.TextInput`
  border: 1px solid #cccccc;
  padding: 5px;
`

export const Screen = styled.ScrollView`
  padding: 20px;
  flex: 1;
  background: white;
`

export const ListItem = styled.TouchableOpacity`
  width: 100%;
  padding-top: 30px;
  padding-bottom: 30px;
  border: 1px solid rgba(200, 200, 200, 0);
  border-bottom-color: rgba(200, 200, 200, 1);
`

export const Button = styled.TouchableOpacity`
  padding: 20px 40px;
  border: 1px solid black;
  border-radius: 4px;
`

export const PressableScreen = styled.TouchableOpacity`
  padding: 20px;
  flex: 1;
  background: ${props => (props.color ? props.color : 'white')};
`

export const ModalInner = styled.View`
  padding: 20px;
  flex: 1;
`
