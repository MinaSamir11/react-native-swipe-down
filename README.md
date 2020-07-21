# react-native-swipe-down
react native swipe down it's animation modal to swipe down as Facebook comments it support flat-list and scroll view inside it without conflict with animation down and scrolling down

# Getting Started
```sh
$ npm install react-native-swipe-down
```

# Usage

`import SwipeDownModal from 'react-native-swipe-down';`

```javascript

  let [ShowComment, setShowModelComment] = useState(false);

<SwipeDownModal
  modalVisible={ShowComment}
  //if you don't pass HeaderContent you should pass marginTop in view of ContentModel to Make modal swipeable
  ContentModal={
    <View style={styles.containerContent}>
      <FlatList
        data={data}
        renderItem={({item, index}) => (
          <item key={index} Data={item} />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  }
  HeaderStyle={styles.headerContent}
  ContentModalStyle={styles.Modal}
  HeaderContent={
    <View style={styles.containerHeader}>
      <Text>Header Content</Text>
    </View>
  }
  onClose={() => {
    setShowModelComment(false);
  }}
/>

const styles = StyleSheet.create({
  containerContent: {flex: 1, marginTop: 40},
  containerHeader: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  headerContent:{
    marginTop: 0,
  },
  Modal: {
    backgroundColor: '#005252',
    marginTop: 0,
  }
});


```
# props
                    
Props | Type | default | Note 
------------- | ------------- | ------------- | -------------
modalVisible  | Boolean | false | Set visiablity of Modal
ContentModal  | React Element | null | `for example: <View><Button text="Hello Mina" align="center" onPress={() => {}}/></View>`
ContentModalStyle  | any | opacity, backgroundColor: '#000', flex: 1, marginTop: 55 | you shouldn't pass opacity or transform 
HeaderContent  | React Element | null | `for example: <View style={{flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center', height: 40}}><Text> Header Content </Text></View>`
HeaderStyle  | any | opacity, width: 700, marginTop: 50, position: 'absolute' | you shouldn't pass opacity or transform
onClose  | func | () => null | Called when Modal closed
ImageBackgroundModal  | image | null | you can set imagebackground of modal instead of backgroundColor
ImageBackgroundModalStyle | any | null | `for example : borderTopLeftRadius: 25, borderTopRightRadius: 25`
