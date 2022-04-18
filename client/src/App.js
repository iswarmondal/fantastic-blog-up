import { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import BlogPosts from './components/BlogPosts/BlogPost';
import BlogPostForm from "./components/BlogPostForm/index.js"
import useStyle from "./assets/styles/app.styles.js"
import './App.css';
import { fetchAllBlogPosts } from './redux/actions/blogPosts';
import { useDispatch } from 'react-redux';

function App() {
  const [blogPostId, setBlogPostId] = useState(0)
  const dispatch = useDispatch();
  const appStyles = useStyle();

  useEffect(()=>{
    dispatch(fetchAllBlogPosts())
  }, [blogPostId, dispatch])

  return (
    <div className="App">
      <Container maxWidth="xl">
        <AppBar
          className={appStyles.navigationBar}
          position="static"
          color="inherit"
        >
          <img
            className={appStyles.image}
            alt="icon"
            height="100"
          />
          <Typography className={appStyles.title} variant="h4" align="center">
            Mern awesome blog
          </Typography>
        </AppBar>
        <Grow in>
          <Container>
            <Grid
              container
              justify="space-between"
              alignItems="stretch"
              spacing={2}
            >
              <Grid item xs={12} sm={7}>
                <BlogPostForm
                  blogPostId = {blogPostId}
                  setBlogPostId = {setBlogPostId}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <BlogPosts 
                  blogPostId = {blogPostId}
                  setBlogPostId = {setBlogPostId}
                />
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
    </div>
  );
}

export default App;
