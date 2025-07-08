import { makeStyles, Theme, useTheme } from "material-ui-core";
import Message, { REACTION } from "models/Message";
import React, { useEffect } from "react";
import sad from "images/reacts/sad.png";
import heart from "images/reacts/heart.png";
import thumbsup from "images/reacts/thumbsup.png";
import surprise from "images/reacts/surprise.png";
import laugh from "images/reacts/laugh.png";
import classNames from "classnames";
import { Position } from "./MessageListComponent";
import { isMobile } from "helpers/utils";

const ReactWheelComponent = (props) => {
  const { center, currentRxn, onClose } = props;
  const classes = useStyles({
    theme: useTheme(),
    xCenter: center.x,
    yCenter: center.y,
    emojiSize: 24,
    emojiMargin: 24,
    currentRxn,
  });
  const isPhone = isMobile();

  // Watch for mouse release
  useEffect(() => {
    if (isPhone) {
      document.addEventListener("touchend", onClose);
    } else {
      document.addEventListener("mouseup", onClose);
    }

    return function cleanup() {
      if (isPhone) {
        document.removeEventListener("touchend", onClose);
      } else {
        document.removeEventListener("mouseup", onClose);
      }
    };
  }, [onClose, isPhone]);

  return (
    <>
      {/* Lines */}
      <div className={classes.container}>
        <div className={classes.lineBox}>
          <div className={classNames(classes.chunk, classes.leftChunk)} />
          <div className={classNames(classes.chunk, classes.rightChunk)} />
          <div className={classNames(classes.chunk, classes.topChunk)} />
          <div className={classNames(classes.chunk, classes.bottomChunk)} />
          <div className={classNames(classes.line, classes.leftLine)} />
          <div className={classNames(classes.line, classes.rightLine)} />
          <div className={classNames(classes.line, classes.topLine)} />
          <div className={classNames(classes.line, classes.bottomLine)} />
        </div>
      </div>
      {/* Circle */}
      <div className={classes.innerCircle} />
      {/* Emojis */}
      <img
        src={sad}
        className={classNames(classes.emoji, classes.sad)}
        alt=""
      />
      <img
        src={heart}
        className={classNames(classes.emoji, classes.heart)}
        alt=""
      />
      <img
        src={thumbsup}
        className={classNames(classes.emoji, classes.thumbsup)}
        alt=""
      />
      <img
        src={surprise}
        className={classNames(classes.emoji, classes.surprise)}
        alt=""
      />
      <img
        src={laugh}
        className={classNames(classes.emoji, classes.laugh)}
        alt=""
      />
    </>
  );
};

export const getReaction = (mousePos, center) => {
  const delta = {
    x: mousePos.x - center.x,
    y: mousePos.y - center.y,
  };

  // Center circle
  if (Math.sqrt(delta.x * delta.x + delta.y * delta.y) < 35) {
    return REACTION.HEART;
  }

  // Could add code here for cancelling if outside of radius
  // if (Math.sqrt(delta.x*delta.x + delta.y*delta.y) > some value) {
  //   return null;
  // }

  // Which Wheel
  if (Math.abs(delta.y) > Math.abs(delta.x)) {
    if (delta.y < 0) {
      return REACTION.THUMBSUP;
    } else {
      return REACTION.SAD;
    }
  } else {
    if (delta.x < 0) {
      return REACTION.SURPRISE;
    } else {
      return REACTION.LAUGH;
    }
  }
};

const useStyles = makeStyles({
  container: (props) => {
    return {
      position: "absolute",
      top: `${props.yCenter - 100}px`,
      left: `${props.xCenter - 100}px`,
      width: "201px",
      height: "201px",
    };
  },
  emoji: (props) => {
    return {
      position: "absolute",
      height: props.emojiSize,
      width: props.emojiSize,
      pointerEvents: "none",
    };
  },
  sad: (props) => {
    return {
      top: `${props.yCenter + props.emojiMargin}px`,
      left: `${props.xCenter - props.emojiSize / 2}px`,
    };
  },
  heart: (props) => {
    return {
      top: `${props.yCenter - props.emojiSize / 2}px`,
      left: `${props.xCenter - props.emojiSize / 2}px`,
    };
  },
  thumbsup: (props) => {
    return {
      top: `${props.yCenter - props.emojiSize - props.emojiMargin}px`,
      left: `${props.xCenter - props.emojiSize / 2}px`,
    };
  },
  surprise: (props) => {
    return {
      top: `${props.yCenter - props.emojiSize / 2}px`,
      left: `${props.xCenter - props.emojiSize - props.emojiMargin}px`,
    };
  },
  laugh: (props) => {
    return {
      top: `${props.yCenter - props.emojiSize / 2}px`,
      left: `${props.xCenter + props.emojiMargin}px`,
    };
  },
  lineBox: {
    transform: "rotate(45deg)",
    position: "relative",
    height: "100%",
    width: "100%",
  },
  chunk: (props) => {
    return {
      // backgroundColor: 'transparent',
      height: "100px",
      width: "100px",
      position: "absolute",
      opacity: 0.75,
      // '&:hover': {
      //   backgroundColor: props.theme.palette.secondary.main,
      // },
      transition: "background-color 125ms linear",
    };
  },
  leftChunk: (props) => ({
    bottom: "50%",
    left: 0,
    borderRadius: "50% 0 0 0",
    backgroundColor:
      props.currentRxn === REACTION.THUMBSUP
        ? props.theme.palette.secondary.main
        : "transparent",
  }),
  rightChunk: (props) => ({
    bottom: "50%",
    right: 0,
    borderRadius: "0 50% 0 0",
    backgroundColor:
      props.currentRxn === REACTION.LAUGH
        ? props.theme.palette.secondary.main
        : "transparent",
  }),
  topChunk: (props) => ({
    left: "50%",
    bottom: 0,
    borderRadius: "0 0 50% 0",
    backgroundColor:
      props.currentRxn === REACTION.SAD
        ? props.theme.palette.secondary.main
        : "transparent",
  }),
  bottomChunk: (props) => ({
    right: "50%",
    bottom: 0,
    borderRadius: "0 0 0 50%",
    backgroundColor:
      props.currentRxn === REACTION.SURPRISE
        ? props.theme.palette.secondary.main
        : "transparent",
  }),
  line: {
    backgroundColor: "black",
    position: "absolute",
  },
  leftLine: {
    height: "1px",
    width: "70px",
    bottom: "50%",
    left: 0,
  },
  rightLine: {
    height: "1px",
    width: "70px",
    bottom: "50%",
    right: 0,
  },
  topLine: {
    width: "1px",
    height: "70px",
    right: "50%",
    top: 0,
  },
  bottomLine: {
    width: "1px",
    height: "70px",
    right: "50%",
    bottom: 0,
  },
  innerCircle: (props) => {
    return {
      position: "absolute",
      top: `${props.yCenter - 30}px`,
      left: `${props.xCenter - 30}px`,
      borderRadius: "50%",
      width: "59px",
      height: "59px",
      backgroundColor:
        props.currentRxn === REACTION.HEART
          ? props.theme.palette.secondary.main
          : props.theme.palette.primary.main,
      // '&:hover': {
      //   backgroundColor: props.theme.palette.secondary.main,
      // },
      transition: "background-color 125ms linear",
    };
  },
});

export default React.memo(ReactWheelComponent);
