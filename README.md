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
    <View style={{flex: 1, marginTop: 40}}>
      <FlatList
        data={Blogs}
        renderItem={({item, index}) => (
          <MessageCommentComponent key={index} Data={item} />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  }
  HeaderStyle={{
    marginTop: 0,
  }}
  ContentModalStyle={{
    backgroundColor: '#005252',
    marginTop: 0,
  }}
  HeaderContent={
    <View
      style={{
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
      }}>
      <Text>Header Content</Text>
    </View>
  }
  onClose={() => {
    setShowModelComment(false);
  }}
/>
```

