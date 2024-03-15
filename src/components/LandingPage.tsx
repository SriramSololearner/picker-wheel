import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Fade,
  Modal,
  Backdrop,
} from "@mui/material";
import { Wheel } from "react-custom-roulette";
import { styles } from "./styles";
import {
  Add,
  MoreHoriz,
  PanoramaOutlined,
  Repeat,
  Sort,
  Visibility,
} from "@mui/icons-material";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  handleSubmit,
  handlerCheck,
  handlerCopyText,
  handlerDel,
  handlerDragAndDrop,
  handlerEdit,
  handlerShuffle,
  handlerUpload,
} from "../redux/reducers/Slider";
import WheelData from "./input_data/WheelData";

export interface Istate {
  inputValue: string;
  singleData: {
    id: number;
    option: string;
    style: {
      backgroundColor: string;
    };
    isChecked: boolean;
  };
  currId: number;
}

const LandingPage = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: 280, sm: 320, md: 350, lg: 450 },
    bgcolor: "background.paper",
    border: 0,
    borderRadius: 1,
    boxShadow: 24,
    p: 4,
  };

  const segColors = [
    "#EE4040",
    "#F0CF50",
    "#815CD1",
    "#3DA5E0",
    "#34A24F",
    "#F9AA1F",
    "#EC3F3F",
    "#FF9000",
  ];

  const dragItem = useRef(-1);
  const dragOverItem = useRef(-1);
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.spinner);
  const [value, setValue] = useState<Istate["inputValue"]>("");
  const [editValue, setEditValue] = useState("");
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [ind, setInd] = useState<Istate["currId"]>(-1);
  const [prizeValue, setPrizeValue] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      setTimeout(() => {
        const obj = data.find((obj) => obj.id - 1 === newPrizeNumber);
        handleOpen();
        obj && setPrizeValue(obj.option);
      }, 11500);
    }
  };

  const handlerSubmit = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    const obj = {
      id: data.length + 1,
      option: value,

      style: {
        backgroundColor:
          segColors[Math.floor(Math.random() * segColors.length)],
      },
      isChecked: true,
    };
    if (value.length !== 0) {
      dispatch(handleSubmit(obj));
      setValue("");
    } else {
      alert("Please enter something");
    }
  };

  const handlerDelete = (objId: number) => {
    dispatch(handlerDel(objId));
  };

  const handlerCopy = (objId: number) => {
    dispatch(handlerCopyText(objId));
  };

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const fileData = event.target.files?.[0]!;

    const obj = {
      id: data.length + 1,
      option: value,
      style: {
        backgroundColor:
          segColors[Math.floor(Math.random() * segColors.length)],
      },
      isChecked: true,
      image: {
        uri: fileData && URL.createObjectURL(fileData),
      },
    };
    dispatch(handlerUpload(obj));
  };

  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>,
    currobj: Istate["singleData"]
  ) => {
    const { checked } = event.target;
    dispatch(handlerCheck({ checked, currobj }));
  };

  const handlerClick = (currtObjId: number) => {
    setInd(currtObjId);
    setEditValue(data[currtObjId - 1].option);
  };

  const handlerEditChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    objId: number
  ) => {
    setEditValue(event.target.value);
    const { value } = event.target;
    dispatch(handlerEdit({ objId, value }));
  };

  const shuffleArray = () => {
    dispatch(handlerShuffle());
  };

  const handleSort = () => {
    console.log("hell0");
    const newData = [...data];
    const draggedItem = newData.splice(dragItem.current, 1)[0];
    newData.splice(dragOverItem.current, 0, draggedItem);
    dragItem.current = -1;
    dragOverItem.current = -1;
    const newArr = newData.map((eachObj, index) => ({
      ...eachObj,
      id: index + 1,
    }));
    dispatch(handlerDragAndDrop(newArr));
  };

  const setterFun = () => {
    setInd(-1);
  };

  const dragItemSetter = (index: number) => {
    dragItem.current = index;
  };
  const dragOverItemSetter = (index: number) => {
    dragOverItem.current = index;
  };

  return (
    <Box sx={styles.root}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              hurray !!!
            </Typography>
            <Typography variant="h2">{prizeValue}</Typography>
          </Box>
        </Fade>
      </Modal>
      <Box sx={styles.wheelContainer}>
        <Wheel
          onStopSpinning={() => setMustSpin(false)}
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data.length > 0 ? data.filter((item) => item.isChecked) : []}
          backgroundColors={["#3e3e3e", "#df3428"]}
          textColors={["#ffffff"]}
          outerBorderColor="white"
          fontSize={15}
          fontWeight={600}
          disableInitialAnimation={false}
        />
        <Button
          onClick={handleSpinClick}
          variant="contained"
          sx={styles.spinBtn}
        >
          Spin
        </Button>
      </Box>
      <Box sx={styles.rightContainer}>
        <Box sx={styles.rightContainer_mainContainer}>
          <Box sx={styles.rightContainer_header}>
            <Box sx={styles.rightContainer_header_innerContainer}>
              <Typography sx={styles.inputsTxt}>
                INPUTS
                <Box component={"span"} sx={styles.header_spanElement}>
                  {data.length}
                </Box>
              </Typography>
            </Box>
            <Stack direction={"row"} alignItems={"center"} gap={2}>
              <Visibility titleAccess="Hide" />
              <Repeat
                titleAccess="shuffle"
                onClick={shuffleArray}
                sx={styles.shuffleIcon}
              />
              <Sort titleAccess="View/Import Inputs" sx={styles.sortIcon} />
              <MoreHoriz titleAccess="More" />
            </Stack>
          </Box>

          <Box sx={styles.rightContainer_inputContainer}>
            <Stack direction={"row"} gap={0.5} justifyContent={"flex-start"}>
              <Box
                sx={styles.inputContainer_innerContainer}
                component={"form"}
                onSubmit={handlerSubmit}
              >
                <TextField
                  id="text-filed-oulined"
                  sx={styles.inputContainer_inputBox}
                  placeholder="Input text here..."
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                />
                <Button sx={styles.addBtn} type="submit">
                  <Add sx={styles.addIcon} />
                </Button>
              </Box>
              <Box sx={styles.imgContainer} component={"label"} htmlFor="image">
                <PanoramaOutlined sx={styles.imgContainer_imgIcon} />
              </Box>
              <Box
                component={"input"}
                onChange={handleUpload}
                type="file"
                id="image"
                sx={styles.upload}
              ></Box>
            </Stack>
            <Box>
              <WheelData
                ind={ind}
                editValue={editValue}
                handlerEditChange={handlerEditChange}
                setterInd={setterFun}
                handlerClick={handlerClick}
                dragItem={dragItemSetter}
                dragOverItem={dragOverItemSetter}
                handleSort={handleSort}
                handlerCopy={handlerCopy}
                handlerDelete={handlerDelete}
                handleCheckboxChange={handleCheckboxChange}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
