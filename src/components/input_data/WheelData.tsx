import React, { ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Box, Stack, TextField } from "@mui/material";
import { styles } from "../styles";
import { Close, CopyAll, DragIndicator } from "@mui/icons-material";
import { Istate } from "../LandingPage";

interface Iprops {
  ind: number;
  editValue: string;
  handlerEditChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    objId: number
  ) => void;
  handleCheckboxChange: (
    event: ChangeEvent<HTMLInputElement>,
    obj: Istate["singleData"]
  ) => void;
  setterInd: () => void;
  handlerClick: (currtObjId: number) => void;
  dragItem: (index: number) => void;
  dragOverItem: (index: number) => void;
  handleSort: () => void;
  handlerCopy: (objId: number) => void;
  handlerDelete: (objId: number) => void;
}

const WheelData = ({
  ind,
  editValue,
  handlerEditChange,
  setterInd,
  handlerClick,
  dragItem,
  dragOverItem,
  handleSort,
  handlerCopy,
  handlerDelete,
  handleCheckboxChange,
}: Iprops) => {
  const { data } = useSelector((state: RootState) => state.spinner);
  return (
    <div>
      {data.length !== 0 &&
        data.map((obj, index) => (
          <Box
            key={obj.id}
            draggable
            onDragEnter={() => dragItem(index)}
            onDragStart={() => dragOverItem(index)}
            onDragEnd={handleSort}
          >
            <Stack>
              {ind === obj.id ? (
                <TextField
                  key={obj.id}
                  sx={styles.textField}
                  value={editValue}
                  onChange={(event) => handlerEditChange(event, obj.id)}
                  onBlur={setterInd}
                />
              ) : (
                <Stack direction={"row"} alignItems={"center"} key={obj.id}>
                  <Box onClick={() => handlerClick(obj.id)} sx={styles.mapItem}>
                    {obj.image?.uri ? (
                      <Box
                        component={"img"}
                        src={obj.image.uri}
                        sx={styles.imgPic}
                        alt="no-img"
                      />
                    ) : (
                      <Box>{obj.option}</Box>
                    )}
                  </Box>
                  <Box>
                    <DragIndicator sx={styles.DragInd} />
                  </Box>
                  <Box onClick={() => handlerCopy(obj.id)}>
                    <CopyAll sx={styles.copyIcon} />
                  </Box>
                  <Box
                    component={"input"}
                    type="checkbox"
                    checked={obj && obj.isChecked}
                    onChange={(event) => handleCheckboxChange(event, obj)}
                    sx={styles.checkbox}
                  ></Box>
                  <Close
                    sx={styles.crossIcon}
                    onClick={() => handlerDelete(obj.id)}
                  />
                </Stack>
              )}
            </Stack>
          </Box>
        ))}
    </div>
  );
};

export default WheelData;
