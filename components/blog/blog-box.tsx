// @ts-ignore
import React from "react";
import "./style.css";
// @ts-ignore
import styled from "styled-components";
// @ts-ignore
import Link from "next/link";

type ImageContainerProps = {
  imageUrl: string;
};

const ImageContainer = styled.div<ImageContainerProps>`
  background-image: ${props => `url(${props.imageUrl})`};
`;

const defaultProps = {
  author: "",
  description: "",
  publishedDate: "",
  readingTime: "",
  className: ""
};

type BlogBoxProps = {
  id: string;
  slug: string;
  imageUrl: string;
  title: string;
  tags?: Array<string>;
} & typeof defaultProps;

export const BlogBox = (props: BlogBoxProps) => {
  return (
    <div className={`col-lg-4 ${props.className} mt-3`}>
      <article className="card">
        {props.imageUrl && <ImageContainer imageUrl={props.imageUrl} className="card__img" />}
        <Link href="/[slug]" as={`/${props.slug}`} passHref>
          <a className="card_link">
            <ImageContainer
              imageUrl={props.imageUrl}
              className="card__img--hover"
            />
          </a>
        </Link>
        <div className="card__info">
          {props.tags && props.tags.length > 0 && (
            <span className="card__category">{props.tags[0]}</span>
          )}

          <Link href="/[slug]" as={`/${props.slug}`} passHref>
            <a style={{ color: "#000", textDecoration: "none" }}>
              <h3 className="card__title">{props.title}</h3>
            </a>
          </Link>
          <span className="card__by">
            by{" "}
            <a href="#" className="card__author" title="author">
              {props.author}
            </a>
          </span>
        </div>

        <div className="card__info-hover">
          <div className="card__description">{props.description}</div>
        </div>
      </article>
    </div>
  );
};

BlogBox.defaultProps = defaultProps;
