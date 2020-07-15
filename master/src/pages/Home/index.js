import React, { useEffect, useRef } from 'react';
import { renderRoutes } from "react-router-config";
import { connect } from 'rreact-redux';
import { actionCreators as commonType } from '@/store/modules/common';

import Header from '@/components/header';
import Footer from '@/components/footer';

function Home(props) {

  const headerRef = useRef();

  const { route } = props;

  const { bannerList, commonList, enterLoading } = props;

  const { getBannerDataDispatch, getRecommendListDataDispatch } = props;

  useEffect(() => {
    console.log(bannerList);
    console.log(commonList);
    console.log(enterLoading);
  }, []);

  function handleCallHeader() {
    headerRef.current.changeVisible();
  };

  function handleClickHeader() {
    console.log('调用了传入Header的方法');
  };

  return (
    <div>
      <Header
        ref={headerRef}
        handleClick={() => handleClickHeader()}
      />
      <div className="buttons">
        <button onClick={()=> handleCallHeader()}>调用Header子组件方法</button>
      </div>
      <div id="subapp-container"></div>
      <Footer/>
      { renderRoutes(route.routes) }
    </div>
  )
}

// 映射Redux全局的state到组件的props上
const mapStateToProps = (state) => ({
  bannerList: state.getIn(['common', 'bannerList']),
  commonList: state.getIn(['common', 'commonList']),
  enterLoading: state.getIn(['common', 'enterLoading']),
});

// 映射dispatch 到props上
const mapDispatchToProps = (dispatch) => {
  return {
    getBannerDataDispatch() {
      dispatch(commonType.getBannerList());
    },
    getRecommendListDataDispatch() {
      dispatch(commonType.getRecommendList());
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Home));
