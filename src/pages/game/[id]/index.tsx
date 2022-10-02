import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Typography, { TypographySizeType, TypographyWeightType } from "../../../components/ui/typography";
import { getGameDetailImages, getGameSeries, getGameSimilar, ResponseCodeType } from "../../../services/api/game"

export default function Game() {

  const [tickIndex, setTickIndex] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);
  const [images, setImages] = useState<any>(undefined);
  const [series, setSeries] = useState<any>(undefined);
  const [videos, setVideos] = useState<any>(undefined);
  const [similar, setSimilar] = useState<any>(undefined);

  useEffect(() => {
    const req = async () => {
      const respImages = await getGameDetailImages({ game_id: "GA00005309" });
      const respSeries = await getGameSeries({ game_id: "GA00006062" });
      const respSimilar = await getGameSimilar({ game_id: "GA00006062" });

      if (respImages.code === ResponseCodeType.SUCCESS) {
        const nset = [];
        const vset = [];
        Object.keys(respImages.data).map(nkey => {
          respImages.data[nkey].rows.map(item => {
            if (item.img_url && item.img_url.length) {
              nset.push(item.img_url)
            }
            if (item.type.indexOf("official_video") !== -1) {
              vset.push({ item })
            }
          })
        })
        setImages(nset);
        setVideos(vset);
      }

      if (respSimilar.code === ResponseCodeType.SUCCESS) {
        setSimilar(respSimilar.data)
      }

      if (respSeries.code === ResponseCodeType.SUCCESS) {
        setSeries(respSeries.data);
      }
    }
    req();
  }, [])

  const FIXED_TAB_CONTENT = [
    {
      name: "세부 정보",
    },
    {
      name: "리뷰",
    },
    {
      name: "게이머 보고서"
    }
  ]

  const FIXED_TICK_CONTENT = [
    {
      name: "기본 정보",
    },
    {
      name: "가격"
    }, {
      name: "한줄평"
    },
  ]


  return <div.wrap>

    <div.main.wrap>
      <div.main.title>
        <Typography size={TypographySizeType.greatest} weight={TypographyWeightType.bolder}>
          Forza Horizon 5
        </Typography>
        <div style={{ color: "#a63a3a", display: "flex", alignItems: "end" }} >
          <Typography size={TypographySizeType.large} weight={TypographyWeightType.bolder}>
            Excellent 4.3 / 5.0
          </Typography>
        </div>
      </div.main.title>
      <div.main.body.wrap>

        <div style={{
          display: "block",
          maxWidth: "100%", width: "100%", height: "100%", maxHeight:450
        }}>
          <div.main.body.img style={{ width:"100%", paddingBottom: "calc( 100% * 184 / 329)", boxShadow: "rgba(0, 0, 0, 0.35) 0px 15px 15px", borderRadius:20 }}>
            {
              images &&
              <Image src={images[0]} layout={"fill"} loading={"lazy"} />

            }
          </div.main.body.img>
        </div>
        <div.main.body.desc.wrap>
          <div.main.body.desc.tick.wrap>
            {FIXED_TICK_CONTENT.map((v, i) => {
              return <div.main.body.desc.tick.item selected={i === tickIndex} onClick={() => {
                setTickIndex(i);
              }}>
                <Typography size={TypographySizeType.small} weight={i === tickIndex ? TypographyWeightType.bolder : TypographyWeightType.thin} >
                  {v.name}
                </Typography>
              </div.main.body.desc.tick.item>
            })}

          </div.main.body.desc.tick.wrap>
          <div style={{ position: "relative", display: "flex", width: "100%", height: "auto" }}>
            <div style={{ width: "100%", position: "relative", height: "100%", paddingTop: 20 }}>


              <div>
                <div style={{ padding: "0px 0px 10px" }}>
                  <Typography size={TypographySizeType.medium} weight={TypographyWeightType.bolder} >
                    특징
                  </Typography>
                </div>
                <div>
                  <Typography size={TypographySizeType.small} weight={TypographyWeightType.medium}>
                    #피 튀기는 #공포 #고어한 #어려운 #재밌는 #폭력적인 #분위기있는
                  </Typography>
                </div>
              </div>

              <div>
                <div style={{ padding: "30px 0px 10px" }}>
                  <Typography size={TypographySizeType.medium} weight={TypographyWeightType.bolder}>
                    장르
                  </Typography>
                </div>
                <div>
                  <Typography size={TypographySizeType.small} weight={TypographyWeightType.medium}>
                    어드벤처, 시뮬레이터, 액션, 스포츠

                  </Typography>
                </div>
              </div>
              <div>
                <div style={{ padding: "30px 0px 10px" }}>
                  <Typography size={TypographySizeType.medium} weight={TypographyWeightType.bolder}>
                    플랫폼
                  </Typography>
                </div>
                <div>
                  <Typography size={TypographySizeType.small} weight={TypographyWeightType.medium}>
                    PlayStation 2, PlayStation 4
                    windows, Mac
                    Android, iOS
                  </Typography>
                </div>
              </div>

            </div>

          </div>
        </div.main.body.desc.wrap>
      </div.main.body.wrap>
    </div.main.wrap>
    <div.tab.wrap>
      {FIXED_TAB_CONTENT.map((v, i) => {
        return <div.tab.item selected={i === tabIndex} key={i} onClick={() => setTabIndex(i)}>
          <Typography size={TypographySizeType.small} weight={i === tabIndex ? TypographyWeightType.bolder : TypographyWeightType.thin}>
            {v.name}
          </Typography>
        </div.tab.item>
      })}

    </div.tab.wrap>
    <div style={{ height: "auto", marginTop: 30, position:"relative" }}>
      <div.content.wrap>
        <div.content.body.wrap>
          <div style={{ margin: "0px 0px 20px" }}>
            <Typography size={TypographySizeType.medium} weight={TypographyWeightType.bolder}>
              공식 영상
            </Typography>
          </div>
          <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(3,1fr)" }}>
            {videos && [...videos, ...videos].slice(0, 3).map((v, i) => {
              return <div.video.wrap key={i}>
                <video width={"100%"} height={"100%"} controls poster={v.item.img_url} style={{ objectFit: "cover" }}>
                  <source src={v.item.video_url} />
                </video>
              </div.video.wrap>
            })}
          </div>
          <div style={{ margin: "60px 0px 20px" }}>
            <Typography size={TypographySizeType.medium} weight={TypographyWeightType.bolder}>
              About
            </Typography>
          </div>
          <div>

            <Typography size={TypographySizeType.small} weight={TypographyWeightType.medium}>
              포르자(/ˈfɔːrtsə/ FORT-sə, 이탈리아어: [ˈfɔrtsa] ; 이탈리아어 로 "힘")는 Xbox Game Studios에서 출시한 Xbox 콘솔, Microsoft Windows, iOS 및 Android 장치용 시뮬레이션 레이싱 게임 시리즈이다. 이 시리즈는 많은 양산, 개조 및 경주용 자동차의 성능 및 핸들링 특성을 재현하려고 한다.

              프랜차이즈는 주로 두 개의 타이틀로 나뉜다. 미국 개발자 Turn 10 Studios가 개발한 오리지널 포르자 모터스포츠 시리즈는 주로 전문적인 스타일의 트랙 레이싱 이벤트와 다양한 실제 및 가상 트랙 을 중심으로 한 시리즈이며, 영국 개발자 Playground Games에서 개발한 포르자 호라이즌 시리즈는 호라이즌 페스티벌"이라고 하는 가상의 레이싱 및 음악 축제로, 플레이어가 자유롭게 돌아다니며 레이싱 이벤트에 참여할 수 있는 가상 현실 세계를 배경으로 한 오픈 월드 환경이 특징이다. 2019년까지 각 프랜차이즈 시리즈의 출시 2년 단위로 교대로 진행되었다. 모터스포츠 시리즈는 홀수 연도에 출시된 반면 호라이즌 시리즈는 짝수 연도에 출시되었다. 이 규칙은 2019년에 새로운 모터스포츠 게임이 없었기 때문에 더이상 지켜지지 않는다.
            </Typography>
          </div>

          <div>

          </div>
          <div style={{ margin: "60px 0px 20px" }}>
            <Typography size={TypographySizeType.medium} weight={TypographyWeightType.bolder}>
              추가 컨텐츠
            </Typography>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {similar && similar.slice(0, 3).map((v, i) => {
              if (v.img_url)
                return <div.card.component key={i} style={{
                  overflow: "hidden",
                  boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",

                }}>
                  <div style={{ position: "relative", width: "100%", paddingTop: "calc( 100% * 184 / 329)" }}>
                    {<Image src={v.img_url} layout={"fill"} priority />}
                  </div>
                  <div style={{ height: 100, padding: 10 }}>
                    <div >
                      <Typography size={TypographySizeType.smaller} weight={TypographyWeightType.bolder}>
                        {v.name_ko}
                      </Typography>
                    </div>
                    <div>

                    </div>
                  </div>
                </div.card.component>
            })}
          </div>
          <div style={{ margin: "70px 0px 30px" }}>
            <Typography size={TypographySizeType.medium} weight={TypographyWeightType.bolder}>
              이 게임과 비슷해요!
            </Typography>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, }}>
            {similar && similar.map((v, i) => {
              if (v.img_url)
                return <div key={i} style={{
                  overflow: "hidden",
                  boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                }}>
                  <div style={{ position: "relative", width: "100%", paddingTop: "calc( 100% * 184 / 329)" }}>
                    {<Image src={v.img_url} layout={"fill"} priority />}
                  </div>
                  <div style={{ height: 100, padding: 10 }}>
                    <div >
                      <Typography size={TypographySizeType.smaller} weight={TypographyWeightType.bolder}>
                        {v.name_ko}
                      </Typography>
                    </div>
                  </div>
                </div>
            })}
          </div>


        </div.content.body.wrap>
        <div.content.aside.wrap>
          <div >
            <Typography size={TypographySizeType.small} weight={TypographyWeightType.bolder}>
              추가 정보
            </Typography>
          </div>
          <div>

          </div>
          <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 10, paddingTop: 20, }}>
            <div>
              <Typography size={TypographySizeType.small} weight={TypographyWeightType.medium}>
                개발사
              </Typography>
            </div>
            <div>
              <Typography size={TypographySizeType.small} weight={TypographyWeightType.thin}>
                Blue Wizard Digital
              </Typography>

            </div>
            <div>
            </div>
            <div>
              <Typography size={TypographySizeType.small} weight={TypographyWeightType.thin}>
                Blue Wizard Digital
              </Typography>

            </div>
            <div>
              <Typography size={TypographySizeType.small} weight={TypographyWeightType.medium}>
                퍼블리셔
              </Typography>
            </div>
            <div>
              <Typography size={TypographySizeType.small} weight={TypographyWeightType.thin}>
                Blue Wizard Digital LP
              </Typography>

            </div>
            <div>
            </div>
            <div>
              <Typography size={TypographySizeType.small} weight={TypographyWeightType.thin}>
                BLUE WIZARD DIGITAL
              </Typography>

            </div>


            <div>
              <Typography size={TypographySizeType.small} weight={TypographyWeightType.medium}>
                출시일
              </Typography>
            </div>
            <div>
              <Typography size={TypographySizeType.small} weight={TypographyWeightType.thin}>
                2018-01-20 iOS
              </Typography>

            </div>
            <div>
            </div>
            <div>
              <Typography size={TypographySizeType.small} weight={TypographyWeightType.thin}>
                2018-01-20 iOS
              </Typography>

            </div>
            <div>
              <Typography size={TypographySizeType.small} weight={TypographyWeightType.medium}>
                플레이 모드
              </Typography>
            </div>
            <div>
              <Typography size={TypographySizeType.small} weight={TypographyWeightType.thin}>
                싱글 플레이
              </Typography>

            </div>
            <div>
              <Typography size={TypographySizeType.small} weight={TypographyWeightType.medium}>
                플레이 수
              </Typography>
            </div>
            <div>
              <Typography size={TypographySizeType.small} weight={TypographyWeightType.thin}>
                1 ~ 4
              </Typography>

            </div>
            <div>
              <Typography size={TypographySizeType.small} weight={TypographyWeightType.medium}>
                한국어 지원
              </Typography>
            </div>
            <div>
              <Typography size={TypographySizeType.small} weight={TypographyWeightType.thin}>
                자막
              </Typography>

            </div>
            <div>
              <Typography size={TypographySizeType.small} weight={TypographyWeightType.medium}>
                지원 언어
              </Typography>
            </div>
            <div>
              <Typography size={TypographySizeType.small} weight={TypographyWeightType.thin}>
                한국어, 영어, 일어 외 17개
              </Typography>

            </div>
          </div>
          <div style={{ marginTop: 60 }}>
            <div>
              <Typography size={TypographySizeType.small} weight={TypographyWeightType.bolder}>
                시스템 요구 사항
              </Typography>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", gridTemplateRows: "repeat(auto,40px)", gap: 20, paddingTop: 20 }}>
              <div>
                <Typography size={TypographySizeType.small} weight={TypographyWeightType.bold}>
                  개발사
                </Typography>
              </div>
              <div>
                <Typography size={TypographySizeType.small} weight={TypographyWeightType.thin}>
                  Blue Wizard Digital
                </Typography>

              </div>
              <div>
              </div>
              <div>
                <Typography size={TypographySizeType.small} weight={TypographyWeightType.thin}>
                  Blue Wizard Digital
                </Typography>

              </div>
              <div>
                <Typography size={TypographySizeType.small} weight={TypographyWeightType.bold}>
                  퍼블리셔
                </Typography>
              </div>
              <div>
                <Typography size={TypographySizeType.small} weight={TypographyWeightType.thin}>
                  Blue Wizard Digital LP
                </Typography>

              </div>
              <div>
              </div>
              <div>
                <Typography size={TypographySizeType.small} weight={TypographyWeightType.thin}>
                  BLUE WIZARD DIGITAL
                </Typography>

              </div>


              <div>
                <Typography size={TypographySizeType.small} weight={TypographyWeightType.bold}>
                  출시일
                </Typography>
              </div>
              <div>
                <Typography size={TypographySizeType.small} weight={TypographyWeightType.thin}>
                  2018-01-20 iOS
                </Typography>

              </div>
              <div>
              </div>
              <div>
                <Typography size={TypographySizeType.small} weight={TypographyWeightType.thin}>
                  2018-01-20 iOS
                </Typography>

              </div>
              <div>
                <Typography size={TypographySizeType.small} weight={TypographyWeightType.bold}>
                  플레이 모드
                </Typography>
              </div>
              <div>
                <Typography size={TypographySizeType.small} weight={TypographyWeightType.thin}>
                  싱글 플레이
                </Typography>

              </div>
              <div>
                <Typography size={TypographySizeType.small} weight={TypographyWeightType.bold}>
                  플레이 수
                </Typography>
              </div>
              <div>
                <Typography size={TypographySizeType.small} weight={TypographyWeightType.thin}>
                  1 ~ 4
                </Typography>

              </div>
              <div>
                <Typography size={TypographySizeType.small} weight={TypographyWeightType.bold}>
                  한국어 지원
                </Typography>
              </div>
              <div>
                <Typography size={TypographySizeType.small} weight={TypographyWeightType.thin}>
                  자막
                </Typography>

              </div>
              <div>
                <Typography size={TypographySizeType.small} weight={TypographyWeightType.bold}>
                  지원 언어
                </Typography>
              </div>
              <div>
                <Typography size={TypographySizeType.small} weight={TypographyWeightType.thin}>
                  한국어, 영어, 일어 외 17개
                </Typography>

              </div>
            </div>
          </div>
        </div.content.aside.wrap>
      </div.content.wrap>
    </div>
  </div.wrap>
}
//style={{ borderRadius: "10px", overflow: "hidden", boxShadow: "rgba(0, 0, 0, 0.35) 0px 15px 15px",background:"black" }}
const div = {
  video: {
    wrap: styled.div`
      border-radius: 10px;
      overflow: hidden;
      background-color: black;
      box-shadow: rgba(0, 0, 0, 0.35) 0px 15px 15px;
      :hover {
        z-index: 10;
        transform: scale(120%);
        transition: all 0.3s ease-in;
      }  
    `
  },
  card: {
    component: styled.div`
      background: ${ p => p.theme.mode.isdark ? "black" : "white"};
      :hover {
        z-index: 10;
        transform: scale(110%);
        transition: all 0.3s ease-in;
      }  
    `
  },
  content: {
    wrap: styled.div`
      display: flex;
      height: auto;
      gap: 40px;
    `,
    body: {
      wrap: styled.div`
        max-width: 860px;
        width: 100%;
      `
    },
    aside: {
      wrap: styled.div`
        flex: 1 0 300px;
        padding-left: 40px;
        border-left: 1px solid #c9c9c9;
      `
    }
  },


  wrap: styled.div`
        height: auto;
        width: 100%;
        position: relative;
        padding: 60px 20px 0px;
        overflow: visible;
    `,
  main: {
    wrap: styled.div`
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;
      border-bottom: 1px solid ${ p => p.theme.isdark? "grey" : "grey"};
      padding-bottom: 40px;
    `,
    title: styled.div`
      border-top: 1px solid silver;
      width: 100%;
      position: relative;
      padding: 20px 0px;
      display: flex;
      justify-content: space-between;
    `,
    body: {
      wrap: styled.div`
            border-radius: 10px;
            overflow: hidden;
            height: 100%;
            width: 100%;
            background-color: white;
            position  : relative;
            //for dark
            display: flex;
        align-items: center;
            background-color: inherit;
      `,
      img: styled.div`
        width: 100%;
        float: left;
        overflow: hidden;
        position: relative;
        
      `,
      desc: {
        wrap: styled.div`
        float:right;
        padding-left:70%;
        width: 100%;
        position: absolute;
        color: white;
        height: calc(100%);
        padding-top: 20px;
        padding-right: 20px;
        background-image: linear-gradient(270deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.9) 40%, rgb(255,255,255,0) 100%);
        `,
        tick: {
          wrap: styled.div`
            display: flex;
            width: 100%;
            padding-bottom: 20px;
          `,
          item: styled.div<{ selected: boolean }>`
            flex: 1;
            text-align: center;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            color:${props => props.selected ? "#993333" : "none"};
            border: 1px solid ${props => props.selected ? "#993333" : "none"};
            border-radius: 50px;
            
            //background-color: ${props => props.selected ? "#443333" : "silver"};
          
        `
        }
      }
    }

  },
  tab: {
    wrap: styled.div`
      display: flex;
      position: sticky;
      top: 60px;
      height: 50px;
        backdrop-filter: blur(10px);
      z-index: 11;
       background-color: ${ p => p.theme.mode.isdark? "black": "white"};
    `,
    item: styled.div<{ selected: boolean }>`
      min-width: 140px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-bottom: 10px;
      z-index: 2;
      color:${props => props.selected ? "#993333" : "none"};
      border-top: 4px solid ${props => props.selected ? "#993333" : "none"};
      
    `
  }

}