import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import * as React from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { Book } from "../common/book.type";
import { RootState } from "../common/rootState.type";
import Footer from "../components/Footer";

const Home = () => {
  const auth = useSelector((state: RootState) => state.auth.isSignIn);
  const [books, setBooks] = React.useState<[] | Book[]>([]);
  const [, setErrorMessage] = React.useState("");
  const [cookies] = useCookies();

  React.useEffect(() => {
    const url = auth
      ? `${process.env.REACT_APP_API_URL}/books`
      : `${process.env.REACT_APP_API_URL}/public/books`;
    const options = {
      headers: {
        authorization: `Bearer ${cookies.token}`,
      },
      params: {
        offset: 0,
      },
    };

    axios
      .get(url, options)
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        setErrorMessage(`書籍一覧の取得に失敗しました。 ${err}`);
      });
  }, []);

  return (
    <Grid container component="main" maxWidth="xs">
      {auth ? (
        <></>
      ) : (
        <>
          <Grid item xs={1} sm={1} md={2} />
          <Grid item xs={10} sm={10} md={8}>
            <Box
              sx={{
                mt: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Container maxWidth="sm">
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="text.primary"
                  gutterBottom
                >
                  bookmailとは
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  color="text.secondary"
                  paragraph
                >
                  ようこそbookmailへ！
                  <br />
                  bookmailでは書籍のレビューを投稿することができます。
                </Typography>
              </Container>
            </Box>
          </Grid>
          <Grid item xs={1} sm={1} md={2} />
        </>
      )}

      <Grid
        container
        spacing={4}
        sx={{
          mt: 1,
        }}
      >
        {books.map((book: Book) => (
          <Grid item key={book.id} xs={12} sm={6} md={3}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h2">
                  {book.title}
                </Typography>
                <Typography variant="subtitle1">{book.detail}</Typography>
                <Typography variant="caption">URL:{book.url}</Typography>
                <Divider />
                <Typography variant="body1" sx={{ pt: 2 }}>
                  {book.review}
                </Typography>
                <Typography align="right" variant="body2">
                  投稿者:{book.reviewer}
                </Typography>
                {book.isMine === true ? (
                  <CardActions>
                    <Button size="small">編集</Button>
                  </CardActions>
                ) : (
                  <></>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Footer />
    </Grid>
  );
};

export default Home;
