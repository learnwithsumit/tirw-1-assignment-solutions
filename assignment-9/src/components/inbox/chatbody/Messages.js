import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { messagesApi } from "../../../features/messages/messagesApi";
import { messagePerPage } from "../../../utils/defaults";
import Message from "./Message";

export default function Messages({ messages = [], totalCount }) {
  const { user } = useSelector((state) => state.auth) || {};
  const { email } = user || {};
  const id = messages[0]?.conversationId;

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const dispatch = useDispatch();
  const fetchMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (page > 1) {
      dispatch(
        messagesApi.endpoints.getMoreMassages.initiate({
          id,
          page,
        })
      );
    }
  }, [page, dispatch, id]);

  useEffect(() => {
    if (totalCount > 0) {
      const more = Math.ceil(totalCount / Number(messagePerPage)) > page;

      setHasMore(more);
    }
  }, [totalCount, page]);

  return (
    <div
      className="relative w-full h-[calc(100vh_-_200px)]  overflow-y-auto flex flex-col-reverse"
      id="scrollableDiv"
    >
      <InfiniteScroll
        dataLength={messages.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        style={{
          display: "flex",
          flexDirection: "column-reverse",
          padding: "20px",
        }}
        inverse={true} //
        scrollableTarget="scrollableDiv"
      >
        <ul className="space-y-2">
          {messages
            .slice()
            .sort((a, b) => a.timestamp - b.timestamp)
            .map((message) => {
              const { message: lastMessage, id, sender } = message || {};

              const justify = sender.email !== email ? "start" : "end";

              return (
                <Message key={id} justify={justify} message={lastMessage} />
              );
            })}
        </ul>
      </InfiniteScroll>
    </div>
  );
}
