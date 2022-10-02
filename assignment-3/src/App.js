import { Navbar, Search, SectionWrapper } from './components/';
import PostContainer from './components/PostContainer';

function App() {
  return (
    <>
      <Navbar />
      <Search />
      <SectionWrapper>
        <PostContainer />
      </SectionWrapper>
    </>
  );
}

export default App;
