import { Button, Grid } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../common/rootState.type";
import { decrease, increase } from "./offsetSlice";

interface PaginationProps {
  booksLength: number;
}

const Pagination = (props: PaginationProps) => {
  const offset = useSelector((state: RootState) => state.offset.offset);
  const dispatch = useDispatch();

  return (
    <Grid
      item
      xs={12}
      sx={{
        display: "flex",
        pt: 2,
        justifyContent: "center",
      }}
    >
      <Button disabled={offset === 0} onClick={() => dispatch(decrease())}>
        ＜前の10件
      </Button>
      <Button
        disabled={props.booksLength < 10}
        onClick={() => dispatch(increase())}
      >
        次の10件＞
      </Button>
    </Grid>
  );
};

export default Pagination;
