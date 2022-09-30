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
  const [similar, setSimilar] = useState<any>(undefined);

  useEffect(() => {
    const req = async () => {
      const respImages = await getGameDetailImages({ game_id: "GA00008211" });
      const respSeries = await getGameSeries({ game_id: "GA00008211" });
      const respSimilar = await getGameSimilar({ game_id: "GA00008211" });

      if (respImages.code === ResponseCodeType.SUCCESS) {
        const nset = [];
        Object.keys(respImages.data).map(nkey => {
          respImages.data[nkey].rows.map(item => {
            if (item.img_url && item.img_url.length) {
              nset.push(item.img_url)
            }
          })
        })
        setImages(nset)
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
          13일의 금요일: 킬러 퍼즐
        </Typography>
        <div style={{ color: "#268a3a", display: "flex", alignItems: "center" }} >
          <Typography size={TypographySizeType.large} weight={TypographyWeightType.bolder}>
            Excellent 4.3 / 5.0
          </Typography>
        </div>
      </div.main.title>
      <div.main.body.wrap>
        <div style={{
          display: "block",
          maxWidth: "860px", width: "100%", height: "100%"
        }}>
          <div.main.body.img style={{ paddingBottom: "calc( 100% * 222 / 329)", boxShadow: "rgba(0, 0, 0, 0.35) 0px 15px 15px", borderRadius: 10, background:"black" }}>
            {
              images &&
              <Image src={images[8]} layout={"fill"} loading={"lazy"} objectFit={"contain"} />

            }
          </div.main.body.img>
        </div>
        <div.main.body.desc.wrap>
          <div.main.body.desc.tick.wrap>
            {FIXED_TICK_CONTENT.map((v, i) => {
              return <div.main.body.desc.tick.item selected={i === tickIndex}>
                <Typography size={TypographySizeType.small} weight={i === tickIndex ? TypographyWeightType.bolder : TypographyWeightType.thin} onClick={() => {
                  setTickIndex( i )
                }}>
                  {v.name}
                </Typography>
              </div.main.body.desc.tick.item>
            })}

          </div.main.body.desc.tick.wrap>
          <div style={{ position: "relative", display: "flex", width: "100%", height: "auto" }}>
            <div style={{ width: "100%", position: "relative", height: "auto", paddingTop: 20 }}>

              <div>
                <div style={{ padding: "0px 0px 10px" }}>
                  <Typography size={TypographySizeType.medium} weight={TypographyWeightType.bolder}>
                    About
                  </Typography>
                </div>
                <div>
                  <Typography size={TypographySizeType.small} weight={TypographyWeightType.medium}>
                    완전한 3D 생활 도시, 내러티브 기반 및 비선형 게임 플레이의 조합, 완전히 개방된 환경을 갖춘 Grand Theft Auto III는 인터랙티브 엔터테인먼트의 큰 도약을 나타냅니다.처음으로 플레이어는 자신의 갱스터 영화의 중심에 놓이게되며, 어떤 일이든 일어날 수 있고 아마도 ...
                  </Typography>
                </div>


              </div>
              <div>
                <div style={{ padding: "30px 0px 10px" }}>
                  <Typography size={TypographySizeType.medium} weight={TypographyWeightType.bolder}>
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
      <div style={{ flex: 1, borderTop: "1px solid silver" }}>

      </div>
    </div.tab.wrap>
    <div style={{ height: 500, marginTop: 30 }}>
      <div.content.wrap>
        <div.content.body.wrap>
          <div style={{ margin: "0px 0px 20px" }}>
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
               한국어, 영어, 중국어, 일어 외 17개
              </Typography>

            </div>
          </div>
              <div style={{ borderTop: '1px solid #999999', marginTop: 50, paddingTop: 50}}>
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
               한국어, 영어, 중국어, 일어 외 17개
              </Typography>

            </div>
          </div>
          </div>
        </div.content.aside.wrap>
      </div.content.wrap>
    </div>
  </div.wrap>
}

const div = {
  card: {
    component: styled.div`
      background: white;
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
      height: 100%;
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
        flex: 1;
      `
    }
  },


  wrap: styled.div`
        height: 100%;
        width: 100%;
        position: relative;
        padding: 0px 20px;
        overflow: scroll;
    `,
  main: {
    wrap: styled.div`
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;
    `,
    title: styled.div`
      border-top: 1px solid silver;
      width: 100%;
      position: relative;
      padding: 40px 0px;
      display: flex;
      justify-content: space-between;
    `,
    body: {
      wrap: styled.div`
        display: flex;
            height: 100%;
            width: 100%;
            background-color: white;
            gap: 40px;
            
      `,
      img: styled.div`
        border-radius: 0px;
        overflow: hidden;
        position: relative;
        
      `,
      desc: {
        wrap: styled.div`
        flex: 1 0 300px;  
        position: relative;
        `,
        tick: {
          wrap: styled.div`
            display: flex;
            width: 100%;
            
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
      margin: 40px 0px 0px;
      position: sticky;
      top: 0px;
      height: 40px;
      background-color: #ffffffcc;
      z-index: 1;
    `,
    item: styled.div<{ selected: boolean }>`
      min-width: 140px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      color:${props => props.selected ? "#993333" : "none"};
      border-top: 1px solid ${props => props.selected ? "#993333" : "silver"};
      
    `
  }

}