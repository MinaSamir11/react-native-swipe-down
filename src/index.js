import React, {useState, useRef, useEffect} from 'react';

import {
  Modal,
  View,
  StyleSheet,
  Animated,
  Dimensions,
  PanResponder,
  TouchableWithoutFeedback,
  Easing,
  ImageBackground,
  Keyboard,
} from 'react-native';

const {height} = Dimensions.get('window');

const SwipeDownModal = props => {
  const TIMING_CONFIG = {duration: 150, easing: Easing.inOut(Easing.ease)};

  const pan = useRef(new Animated.ValueXY()).current;

  const [isAnimating, setIsAnimating] = useState(false);

  let animatedValueX = 0;

  let animatedValueY = 0;

  const panResponder = useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: () => false,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if (isAnimating) {
          return false;
        }
        if (gestureState.dy > 22) {
          return true;
        }
        return false;
      },
      onPanResponderGrant: () => {
        pan.setOffset({
          x: animatedValueX,
          y: animatedValueY,
        });
        pan.setValue({x: 0, y: 0}); // Initial value
      },
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          pan.setValue({x: 0, y: gestureState.dy});
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        // Flatten the offset so it resets the default positioning
        if (gestureState.dy > 0 && gestureState.vy > 0) {
          if (gestureState.vy <= -0.7 || gestureState.dy <= -100) {
            Animated.timing(pan, {
              toValue: {x: 0, y: -height},
              ...TIMING_CONFIG,
            }).start(() => {
              props.onClose();
            });
          } else if (gestureState.vy >= 0.5 || gestureState.dy >= 100) {
            Animated.timing(pan, {
              toValue: {x: 0, y: height / 2},
              ...TIMING_CONFIG,
            }).start(() => {
              props.onClose();
            });
          } else {
            Animated.spring(pan, {
              toValue: 0,
            }).start();
          }
        } else {
          Animated.spring(pan, {
            toValue: 0,
          }).start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    if (props.modalVisible) {
      animatedValueX = 0;
      animatedValueY = 0;
      pan.setOffset({
        x: animatedValueX,
        y: animatedValueY,
      });
      pan.setValue({x: 0, y: 0}); // Initial value
      pan.x.addListener(value => (animatedValueX = value.value));
      pan.y.addListener(value => (animatedValueY = value.value));
      showCommentAnimation();
    }
  }, [props.modalVisible]);

  let showCommentAnimation = () => {
    setIsAnimating(true);
    Animated.timing(pan, {
      ...TIMING_CONFIG,
      toValue: {x: 0, y: 0},
    }).start(() => {
      setIsAnimating(false);
    });
  };

  const handleOnClose = () => {
    Keyboard.dismiss();
    Animated.timing(pan, {
      ...TIMING_CONFIG,
      toValue: {x: 0, y: height},
    }).start(() => {
      props.onClose();
    });
  };

  let handleGetStyle = opacity => {
    return [
      [
        styles.container,
        {
          transform: [{translateX: pan.x}, {translateY: pan.y}],
          opacity: opacity,
        },
        [props.HeaderStyle],
      ],
    ];
  };

  let handleGetStyleBody = opacity => {
    return [
      [
        styles.background,
        {
          transform: [{translateX: pan.x}, {translateY: pan.y}],
          opacity: opacity,
          backgroundColor: '#000',
        },
      ],
      [props.ContentModalStyle],
    ];
  };

  let interpolateBackgroundOpacity = pan.y.interpolate({
    inputRange: [-height, 0, height / 2],
    outputRange: [0, 1, 0],
  });

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        handleOnClose();
      }}>
      <Animated.View
        style={handleGetStyleBody(interpolateBackgroundOpacity)}
        {...panResponder.panHandlers}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ImageBackground
            source={props.ImageBackgroundModal && props.ImageBackgroundModal}
            style={{
              width: '100%',
              height: '100%',
            }}
            imageStyle={
              props.ImageBackgroundModalStyle && props.ImageBackgroundModalStyle
            }>
            {props.ContentModal}
          </ImageBackground>
        </TouchableWithoutFeedback>
      </Animated.View>

      <Animated.View
        style={handleGetStyle(interpolateBackgroundOpacity)}
        {...panResponder.panHandlers}>
        <TouchableWithoutFeedback>
          {props.HeaderContent ? props.HeaderContent : <View style={{}} />}
        </TouchableWithoutFeedback>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
    opacity: 0,
    flex: 1,
    marginTop: 55,
  },
  container: {
    width: 700,
    marginTop: 50,
    borderColor: '#000',
    borderRadius: 10,
    position: 'absolute',
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default SwipeDownModal;
