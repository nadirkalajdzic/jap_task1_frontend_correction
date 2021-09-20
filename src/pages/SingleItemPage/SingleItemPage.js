import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Paragraph from "antd/lib/typography/Paragraph";
import Chip from "@material-ui/core/Chip";
import { Image } from "antd";

import Page from "../../components/Page/Page";

import "./SingleItemPage.css";
import "antd/dist/antd.css";
import popcorn from "../../popcornimg";
import { StyledRating } from "../../components/ItemCard/Style";
import { makeStyles } from "@material-ui/core";
import { getMedia } from "../../services/mediaService";
import links from "../../links/links";

const useStyles = makeStyles({
  chip: {
    borderRadius: 4,
    fontFamily: "Open Sans, sans-serif",
    color: "var(--black-color)",
    fontWeight: "bold",
    marginRight: 5,
  },
  paragraph: {
    fontFamily: "Open Sans, sans-serif",
    color: "var(--black-color)",
  },
});

function SingleItemPage() {
  const [item, setItem] = useState();
  const history = useHistory();
  const params = useParams();
  const classes = useStyles();
  const [id, setId] = useState(params.id);

  if (params.id !== id) setId(params.id);

  useEffect(() => {
    getMedia(id)
      .then((x) => setItem(x.data.data))
      .catch(() => history.push("/404"));
  }, [id, history]);

  if (item === undefined)
    return (
      <Page>
        <div style={{ textAlign: "center", marginTop: 200 }}>Loading...</div>
      </Page>
    );

  return (
    <Page>
      <div className="single-item-page">
        <div className="single-item-page-breadcrumbs">
          <Breadcrumbs separator="/">
            <Link
              className="single-item-link-breadcrumb bold"
              to={links.home.url}
            >
              Moviesapp
            </Link>
            <div className="single-item-page-current">{item.title}</div>
          </Breadcrumbs>
        </div>
        <div className="single-item-page-content">
          <div className="single-item-page-image">
            <Image
              className="single-item-img"
              src={item.imageUrl}
              fallback={popcorn}
            />
          </div>
          <div className="single-item-page-title">{item.title}</div>
          <div className="single-item-page-rating">
            {item.averageRating === 0 ? (
              <p>Not rated yet</p>
            ) : (
              <p>Rating: {item.averageRating.toFixed(2)}</p>
            )}
            <div>
              <StyledRating
                name="read-only"
                style={{ marginBottom: 10, height: 30 }}
                value={item.averageRating.toFixed(2)}
                precision={0.1}
                readOnly
              />
            </div>
          </div>
          <div className="font-styling">
            Release date: {new Date(item.releaseDate).toDateString()}
          </div>
          <div className="margin-top font-styling inline">
            <div>Categories:</div>
            <div className="single-item-page-chips">
              {item.categories.map((x, index) => {
                return (
                  <Chip
                    size="small"
                    key={`categories-id-${index}`}
                    label={x.name}
                    className={classes.chip}
                  />
                );
              })}
            </div>
          </div>
          <div className="font-styling inline">
            <div>Actors:</div>
            <div className="single-item-page-chips">
              {item.actors.map((x, index) => {
                return (
                  <Chip
                    size="small"
                    key={`actors-id-${index}`}
                    label={x.firstName + " " + x.lastName}
                    className={classes.chip}
                  />
                );
              })}
            </div>
          </div>
          <div className="single-item-page-description">
            <Paragraph
              className={classes.paragraph}
              ellipsis={{ rows: 7, expandable: true, symbol: "show more" }}
            >
              {item.description}
            </Paragraph>
          </div>
        </div>
      </div>
    </Page>
  );
}

export default SingleItemPage;
