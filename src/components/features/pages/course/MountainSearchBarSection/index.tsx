"use client";

import Search from "@/icons/Search.svg";
import { useBridge } from "@hooks/common/useBridge";
import Spacing from "@shared/layout/Spacing";
import TagItemWithCancel from "@shared/ui/TagItemWithCancel";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export default function MountainSearchBarSection() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentSearchTexts, setCurrentSearchTexts] = useState<string[]>([]);
  const { request } = useBridge();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prevSearchTexts = JSON.parse(
      localStorage.getItem("currenMountainSearchList") ?? "[]"
    );

    setCurrentSearchTexts(prevSearchTexts);
  }, []);

  const postNavigateMessage = useCallback(
    (mountainName: string) => {
      request({
        requestMessage: {
          method: "POST",
          name: "request-navigate",
          body: {
            mountainName,
          },
        },
      });
    },
    [request]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
    },
    [setSearchText]
  );

  const handleSearch = useCallback(() => {
    if (typeof window === "undefined") return;

    const newCurrentSearchTexts = JSON.stringify([
      searchText,
      ...currentSearchTexts,
    ]);
    localStorage.setItem("currenMountainSearchList", newCurrentSearchTexts);

    postNavigateMessage(searchText);
  }, [currentSearchTexts, postNavigateMessage, searchText]);

  const handleDeleteAll = useCallback(() => {
    if (typeof window === "undefined") return;

    localStorage.removeItem("currenMountainSearchList");
    setCurrentSearchTexts([]);
  }, []);

  const handleClickTag = useCallback(
    (mountainName: string) => {
      postNavigateMessage(mountainName);
    },
    [postNavigateMessage]
  );

  const handleClickCancel = useCallback(
    (text: string) => {
      const newCurrentSearchTexts = currentSearchTexts.filter(
        (item) => item !== text
      );
      setCurrentSearchTexts(newCurrentSearchTexts);
      localStorage.setItem(
        "currenMountainSearchList",
        JSON.stringify(newCurrentSearchTexts)
      );
    },
    [currentSearchTexts]
  );

  return (
    <>
      {isFocused ? (
        <div className="absolute top-0 right-0 w-full h-full z-20 bg-white flex flex-col px-6">
          <Spacing size={16} />
          <div>
            <span onClick={() => setIsFocused(false)}>&larr;</span>
          </div>
          <Spacing size={8} />
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="산 이름을 입력해주세요"
              className="rounded-full text-lg p-4 shadow z-30 w-full"
              autoFocus
              onFocus={() => setIsFocused(true)}
              onChange={handleInputChange}
              value={searchText}
            />
            <button
              onClick={handleSearch}
              className="absolute top-1/2 right-4 -translate-y-1/2"
            >
              <Image src={Search} alt="산 검색" />
            </button>
          </div>

          <Spacing size={8} />
          <div className="flex justify-between">
            <span className="text-xl">최근 검색어</span>
            <button onClick={handleDeleteAll}>
              <span className="text-sm">전체 삭제</span>
            </button>
          </div>
          <Spacing size={5} />
          <div className="flex flex-row gap-2 flex-wrap">
            {currentSearchTexts.map((text, index) => (
              <TagItemWithCancel
                key={index}
                text={text}
                onClickTag={() => handleClickTag(text)}
                onClickCancel={() => {
                  handleClickCancel(text);
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            placeholder="산 이름을 입력해주세요"
            className="rounded-full text-lg p-4 shadow z-30 w-full"
            onFocus={() => setIsFocused(true)}
          />
          <Image
            src={Search}
            alt="search"
            className="absolute top-1/2 right-4 -translate-y-1/2"
          />
        </div>
      )}
    </>
  );
}
