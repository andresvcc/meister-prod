import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const PartsSVG = ({ onClick = () => false, useSelector: [selector, setSelector] = [-1, () => false] }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width="1550px"
    height="1050px"
    // width="3440px"
    // height="2040px"
    version="1.1"
    shapeRendering="geometricPrecision"
    textRendering="geometricPrecision"
    imageRendering="optimizeQuality"
    fillRule="evenodd"
    clipRule="evenodd"
    viewBox="0 0 3440 2040"
    xlink="http://www.w3.org/1999/xlink"
  >
    <style>
      { '.imgParts { opacity: 0.5 } .imgParts:hover { opacity: 1; cursor: pointer}' }
    </style>
    <defs>
      <clipPath id="id0">
        <path d="M350 1367l520 -12 144 185 326 -4 30 456 1214 0 2 -679 558 -9 15 458 -105 135 -470 95 -2234 0 0 -625z" />
      </clipPath>
      <clipPath id="id1">
        <path d="M2322 782l146 21 70 199 -71 243 -197 20 -70 192 83 27 4 218 -91 17 -32 199 -154 17 -222 -153 -66 -283 155 -117 108 -54 14 -99 296 8 -92 -156 119 -299z" />
      </clipPath>
      <clipPath id="id2">
        <rect x="2296" y="1556" width="291" height="161" />
      </clipPath>
      <clipPath id="id3">
        <path d="M1384 1425l117 3 71 -74 127 -6 0 146 -75 -24 -3 205 96 6 63 73 -111 78 -11 107 -116 -1 0 -95 -166 2 8 -420z" />
      </clipPath>
      <clipPath id="id4">
        <path d="M873 320l421 26 62 119 352 65 429 -17 4 -68 108 -25 97 186 -275 531 -518 -102 -206 -193 -5 480 -481 11 12 -1013z" />
      </clipPath>
      <clipPath id="id5">
        <path d="M2387 482l143 -260 35 -131 80 59 14 124 109 -83 -25 221 -71 142 55 112 55 276 -93 -53 -88 83 -173 -332 -41 -158z" />
      </clipPath>
      <clipPath id="id6">
        <path d="M3011 169l248 -15 -13 1060 -256 4 -8 40 -121 29 -127 -43 -12 -240 286 -25 1 -170 -142 -45 -5 -146 147 -59 2 -390z" />
      </clipPath>
      <clipPath id="id7">
        <path d="M1260 86l1101 -17 63 210 -172 124 -228 9 -185 -79 -567 13 -65 -125 53 -135z" />
      </clipPath>
      <clipPath id="id8">
        <path d="M281 147l221 -63 290 96 66 129 -6 67 -69 -11 -74 -109 -117 -67 -152 7 -118 59 -101 -30 60 -78z" />
      </clipPath>
      <clipPath id="id9">
        <path d="M323 376l146 -18 173 21 79 186 -42 58 120 22 -17 209 11 227 -106 -31 -83 100 -174 89 -108 -129 39 -171 64 -23 -12 -246 -128 -94 38 -200z" />
      </clipPath>
    </defs>
    <g id="Layer_x0020_1">
      <metadata id="CorelCorpID_0Corel-Layer" />
      <g className="imgParts" clipPath="url(#id0)" onClick={() => onClick('Chassis')}>
        <image id="Object_x0020_1" x="350" y="1304" width="2794" height="689" xlinkHref="/static/categorie/final3_ImgID1.png" />
      </g>
      <g className="imgParts" onClick={() => onClick('Engine')}>
        <g clipPath="url(#id1)">
          <image id="Object_x0020_1_0" x="1699" y="775" width="832" height="1146" xlinkHref="/static/categorie/final3_ImgID2.png" />
        </g>

        <g clipPath="url(#id2)">
          <image id="Object_x0020_2" x="2296" y="1556" width="291" height="161" xlinkHref="/static/categorie/final3_ImgID3.png" />
        </g>

      </g>
      <g className="imgParts" clipPath="url(#id3)" onClick={() => onClick('Exhaust')}>
        <image id="Object_x0020_1_1" x="1231" y="1259" width="615" height="679" xlinkHref="/static/categorie/final3_ImgID4.png" />
      </g>
      <g className="imgParts" clipPath="url(#id4)" onClick={() => onClick('Chassis')}>
        <image id="Object_x0020_1_2" x="818" y="290" width="1514" height="1106" xlinkHref="/static/categorie/final3_ImgID5.png" />
      </g>
      <g className="imgParts" clipPath="url(#id5)" onClick={() => onClick('Cockpit')}>
        <image id="Object_x0020_1_3" x="2398" y="118" width="448" height="861" xlinkHref="/static/categorie/final3_ImgID6.png" />
      </g>
      <g className="imgParts" clipPath="url(#id6)" onClick={() => onClick('Chassis')}>
        <image id="Object_x0020_1_4" x="2558" y="154" width="701" height="1421" xlinkHref="/static/categorie/final3_ImgID7.png" />
      </g>
      <g className="imgParts" onClick={() => onClick('Bodyworks')}>
        <g clipPath="url(#id7)">
          <image id="Object_x0020_1_5" x="1047" y="89" width="1781" height="464" xlinkHref="/static/categorie/final3_ImgID8.png" />
        </g>

        <g clipPath="url(#id8)">
          <image id="Object_x0020_1_6" x="244" y="117" width="841" height="323" xlinkHref="/static/categorie/final3_ImgID9.png" />
        </g>

      </g>
      <g className="imgParts" clipPath="url(#id9)" onClick={() => onClick('Electrics')}>
        <image id="Object_x0020_1_7" x="323" y="376" width="570" height="918" xlinkHref="/static/categorie/final3_ImgID10.png" />
      </g>
    </g>
  </svg>
);

PartsSVG.propTypes = {};

export default PartsSVG;
