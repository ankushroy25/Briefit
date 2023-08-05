import React from "react";
import { useEffect, useState } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  const [article, setArticle] = useState({ url: "", summary: "" });
  const [allArticles, setAllArticles] = useState([]);
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
  const [copied, setCopied] = useState("");
  const [summaryCopied, setSummaryCopied] = useState("");

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      console.log(newArticle);
      setAllArticles(updatedAllArticles);
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };
  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false, 3000));
  };

  const handleSummaryCopy = (copySummary) => {
    setSummaryCopied(copySummary);
    navigator.clipboard.writeText(copySummary);
    setTimeout(() => setSummaryCopied(false, 3000));
  };

  return (
    <section className="w-full max-w-2xl mt-8 ">
      {/* search */}
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img src={linkIcon} className="absolute left-0 my-2 ml-3 w-5" />
          <input
            required
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            className="url_input peer-focus:border-gray-700 peer-focus:text-gray-700"
          />

          <button type="submit" className="submit_btn">
            ✅
          </button>
        </form>

        {/* URL history */}
        <div className="flex flex-col gap-1 max-h-36 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt=""
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="fleex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* display results */}
      <div className="flex justify-center max-w-full items-center">
        {isFetching ? (
          <img src={loader} className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Oops something's wrong...
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <span className="flex flex-row justify-center font-extrabold text-gray-700 text-3xl m-2">
                Summary
                <div
                  className="copy_btn ml-4"
                  onClick={() => handleSummaryCopy(article.summary)}
                >
                  <img src={copy} />
                </div>
              </span>
              <div className="summary_box">
                <p className="font-inter font-medium text-md text-gray-700">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
