export const styles = {
    root: {
        width: { xs: "100%", md: "88%" },
        height: { xs: "100%", md: "95%" },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#ffffff",
        flexDirection: { xs: "column", md: "row" },
        transition: "all 0.5s ease"
    },
    wheelContainer: {
        width: { md: "50%", },
        height: "100%",
        mt: { xs: 4, md: 0 },
        ml: { md: 12 },
        pt: { xs: 10, md: 7 },
        pl: { xs: 0, md: 0 },
        position: "relative"
    },
    spinBtn: {
        zIndex: "10",
        background: "grey",
        color: "white",
        fontSize: "15px",
        borderRadius: "50%",
        border: "1px solid #3c426b",
        "&:hover": {
            background: "grey",
            border: "1px solid #3c426b",
            opcaity: "0.8"
        },
    },
    rightContainer: {
        width: { xs: "95%", md: "50%" },
        height: "90%",
        mt: { xs: 1, md: 0 },

    },
    rightContainer_mainContainer: {
        width: { xs: "100%", sm: "100%", md: "60%" },
        height: "100%",
        border: "1px solid black",
        borderRadius: 5,
        overflowY: "auto",
        "&::-webkit-scrollbar": {
            display: "none"
        }
    },
    rightContainer_header: {
        width: "100%",
        display: 'flex',
        alignItems: "center",
        m: 3,
        justifyContent: "space-between",

    },
    rightContainer_header_innerContainer: {
        display: 'flex',
        alignItems: "center",
    },
    inputsTxt: {
        fontSize: "1.3rem",
        fontWeight: 600,
    },

    header_spanElement: {
        border: "1px solid black",
        p: "2px",
        fontSize: "15px",
        fontWeight: 400,
        ml: 1
    },
    rightContainer_inputContainer: {
        display: 'flex',
        flexDirection: "column",
        width: "85%",
        ml: 3

    },
    inputContainer_innerContainer: {
        display: 'flex',
        alignItems: "center",
        width: "100%",
        height: "3em",
        background: "#d3d3d3",
        pl: 2,
    },
    inputContainer_inputBox: {
        "& input": {
            background: "#d3d3d3",
            height: "0.5em",
            fontSize: "18px",
            color: "grey",
            "&::placeholder": { color: `grey`, },
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                display: "none"
            },
        },
    },
    addBtn: {
        pt: 1.2,
        color: "black",
        ml: 2,
        "&:hover": {
            color: "black",
            background: "#d3d3d3",
        },
    },
    addIcon: {
        fontSize: "28px",
        fontWeight: 400
    },
    sortIcon: {
        background: "#fce7b5",
        borderRadius: "50%",
        p: 1,
        color: "#f7bb2b",
        cursor: "pointer"
    },
    imgContainer: {
        height: "3em",
        background: "#d3d3d3",
        width: "15%",
        display: "flex",
        alignItems: 'center',
        justifyContent: "center",
    },
    imgContainer_imgIcon: {
        cursor: "pointer",
        fontSize: "25px"
    },
    upload: { display: "none" },
    mapItem: {
        width: "80%",
        height: "2em",
        background: "#f2f2f2",
        mb: 1,
        mt: 2,
        display: "flex",
        pl: 1,
        pt: 0.5,
        fontSize: { xs: "11px", sm: "12px", md: "14px", lg: "15px" },
    },
    checkbox: {
        cursor: 'pointer',
        "&": {
            accentColor: "green",
            width: "15px",
            height: "15px"
        }
    },
    textField: {
        "& input": {
            width: "100%",
            mt: 1,
            height: "1px",
            background: "#f2f2f2",
            fontSize: "15px",
            color: "grey",
            "&::placeholder": { color: `grey`, },
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                display: "none",
            },
        },
    },
    imgPic: {
        display: "flex",
        justifyContent: "flex-end",
    },
    crossIcon: {
        color: 'red',
        cursor: "pointer"
    },
    shuffleIcon: {
        cursor: "pointer",
        color: "grey"
    },
    copyIcon: { cursor: "pointer" },
    DragInd: { cursor: "move" },
}