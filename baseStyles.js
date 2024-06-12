import { StyleSheet } from 'react-native';
import cssConsts from './cssConsts';

export default StyleSheet.create({
  width100: {
    width: '100%',
  },
  whiterBackground: {
    display: 'flex',
    backgroundColor: cssConsts.whiterColor,
  },
  softBackground: {
    backgroundColor: cssConsts.softColor,
  },
  darkerBackground: {
    backgroundColor: cssConsts.darkerColor,
  },
  absolute: {
    position: 'absolute',
  },
  greyColor: {
    color: '#afafaa'
  },
  marginTop10: {
    marginTop: 10,
  },
  marginTop25: {
    marginTop: 25,
  },
  marginBottom5: {
    marginBottom: 5,
  },
  marginBottom10: {
    marginBottom: 10,
  },
  marginRight2: {
    marginRight: 2,
  },
  marginRight5: {
    marginRight: 5,
  },
  marginRight10: {
    marginRight: 10,
  },
  marginRight15: {
    marginRight: 15,
  },
  marginRight25: {
    marginRight: 25,
  },
  marginLeft2: {
    marginLeft: 2,
  },
  marginLeft5: {
    marginLeft: 5,
  },
  marginLeft10: {
    marginLeft: 10,
  },
  marginLeft15: {
    marginLeft: 15,
  },
  marginLeft25: {
    marginLeft: 25,
  },
  paddingBottom10: {
    paddingBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  minorTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
  },
  minorSubtitle: {
    fontSize: 11
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  alignCenter: {
    alignItems: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifySpace: {
    justifyContent: 'space-between',
  },
  justifyEvenly: {
    justifyContent: 'space-evenly',
  },
  image: {
    width: 120,
    height: 180,
    borderRadius: 12,
    borderColor: '#000',
    borderWidth: 10,
    borderRadius: 10,
  },
  imageLogo: {
    width: 180,
    height: 180
  },
  fontSize10: {
    fontSize: 10,
  },
  inputForm: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  titleForm: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 25,
    margin: 2
  },
});