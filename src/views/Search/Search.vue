<template>
  <div>
    <TypeNav></TypeNav>
    <div class="main">
            <div class="py-container">
                <!--bread-->
                <div class="bread">
                    <ul class="fl sui-breadcrumb">
                        <li>
                            <a href="#">全部结果</a>
                        </li>
                    </ul>
                    <ul class="fl sui-tag">
                        <!-- 分类brand -->
                        <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName">×</i></li>
                        <!-- 关键字brand -->
                        <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeyword ">×</i></li>
                        <!-- 品牌的brand -->
                        <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(':')[1]}}<i @click="removeTrademark ">×</i></li>
                        <!-- 平台的售卖的属性值 -->
                        <li class="with-x" v-for="(attrValue,index) in searchParams.props" :key="index">{{attrValue.split(':')[1]}}<i @click="removeAttr(index)">×</i></li>
                    </ul>
                </div>
                <!--selector-->
                <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"></SearchSelector>
                <!--details-->
                <div class="details clearfix">
                    <div class="sui-navbar">
                        <div class="navbar-inner filter">
                            <!-- 排序结构 -->
                            <ul class="sui-nav">
                                <li :class="{active:isOne}" @click="changeOrder('1')">
                                    <a>综合 <span v-show="isOne" class="iconfont" :class="{ 'icon-up':isAsc,'icon-down':isDesc}"></span></a>
                                </li>
                                <li :class="{active:isTwo}" @click="changeOrder('2')">
                                    <a>价格 <span v-show="isTwo" class="iconfont" :class="{ 'icon-up':isAsc,'icon-down':isDesc}"></span></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="goods-list">
                        <ul class="yui3-g">
                            <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <router-link :to="`/detail/${goods.id}`">
                                            <img  v-lazy="goods.defaultImg" />
                                        </router-link>
                                    </div>
                                    <div class="price">
                                        <strong>
                                                <em>¥</em>
                                                <i>{{goods.price}}</i>
                                            </strong>
                                    </div>
                                    <div class="attr">
                                        <a target="_blank" href="item.html"  title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{goods.title}}</a>
                                    </div>
                                    <div class="commit">
                                        <i class="command">已有<span>2000</span>人评价</i>
                                    </div>
                                    <div class="operate">
                                        <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                                        <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <myPagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5" @getPageNo="getPageNo"></myPagination>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import SearchSelector from './SearchSelector/SearchSelector.vue'
export default {
  name: 'mySearch',
  data () {
    return {
      searchParams: {
        category1Id: '',
        category2Id: '',
        category3Id: '',
        categoryName: '',
        keyword: '',
        order: '1:desc',
        pageNo: 1,
        pageSize: 3,
        props: [],
        trademark: ''

      }
    }
  },
  components: {
    SearchSelector
  },
  beforeMount () {
    // this.searchParams.category1Id = this.$route.query.category1Id
    // Object.assign  ES6新增的语法
    Object.assign(this.searchParams, this.$route.query, this.$route.params)
  },
  mounted  () {
    this.getDate()
  },
  computed: {
    ...mapGetters(['goodsList']),
    ...mapState({
      total: state => state.search.searchList.total
    }),
    isOne () {
      return this.searchParams.order.indexOf('1') !== -1
    },
    isTwo () {
      return this.searchParams.order.indexOf('2') !== -1
    },
    isAsc () {
      return this.searchParams.order.indexOf('asc') !== -1
    },
    isDesc () {
      return this.searchParams.order.indexOf('desc') !== -1
    }
  },
  methods: {
    getDate () {
      this.$store.dispatch('getSearchInfo', this.searchParams)
    },
    removeCategoryName () {
      // 数据值为空字符串也会向服务器发送请求 undefined 则不会发送请求
      this.searchParams.categoryName = undefined
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      this.getDate()
      // 地址栏也需要改
      if (this.$route.params) {
        this.$router.push({ name: 'search', params: this.$route.params })
      }
    },
    removeKeyword () {
      this.searchParams.keyword = undefined
      this.getDate()
      this.$bus.$emit('clear')
      if (this.$route.query) {
        this.$router.push({ name: 'search', query: this.$route.query })
      }
    },
    // 自定义事件的回调
    trademarkInfo (trademark) {
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
      this.getDate()
    },
    // 删除品牌的信息
    removeTrademark () {
      this.searchParams.trademark = undefined
      this.getDate()
    },
    attrInfo (attr, attrValue) {
      const props = `${attr.attrId}:${attrValue}:${attr.attrName}`
      if (this.searchParams.props.indexOf(props) === -1) { this.searchParams.props.push(props) }
      this.getDate()
    },
    // 删除售卖属性
    removeAttr (index) {
      this.searchParams.props.splice(index, 1)
      this.getDate()
    },
    // 排序
    changeOrder (flag) {
      const originOrder = this.searchParams.order
      const originFlag = this.searchParams.order.split(':')[0]
      const originSort = this.searchParams.order.split(':')[1]
      let newOrder = ''
      // 确定点击一定是综合
      if (flag === originFlag) {
        newOrder = `${originFlag}:${originSort === 'desc' ? 'asc' : 'desc'}`
      } else {
        newOrder = `${flag}:desc`
      }
      this.searchParams.order = newOrder
      console.log(originOrder)
      this.getDate()
    },
    getPageNo (pageNo) {
      this.searchParams.pageNo = pageNo
      this.getDate()
      console.log(pageNo)
    }
  },
  watch: {
    $route (to, from) {
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
      this.getDate()
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
    }
  }

}
</script>

<style lang="less" scoped>
   .main{
        margin: 10px 0;
        .py-container{
            width: 1200px;
            margin: 0 auto;
            .bread{
                margin-bottom: 5px;
                overflow: hidden;
                .sui-breadcrumb{
                    padding: 3px 15px;
                    margin: 0;
                    font-weight: 400;
                    border-radius: 3px;
                    float:left;
                    li{
                        display: inline-block;
                        line-height: 18px;
                        a{
                            color: #666;
                            text-decoration: none;
                            &:hover{
                                color: #4cb9fc;
                            }
                        }
                    }
                }
                .sui-tag{
                    margin-top: -5px;
                    list-style: none;
                    font-size: 0;
                    line-height: 0;
                    padding: 5px 0 0;
                    margin-bottom: 18px;
                    float: left;
                    .with-x{
                        font-size: 12px;
                        margin: 0 5px 5px 0;
                        display: inline-block;
                        overflow: hidden;
                        color: #000;
                        background: #f7f7f7;
                        padding: 0 7px;
                        height: 20px;
                        line-height: 20px;
                        border: 1px solid #dedede;
                        white-space: nowrap;
                        transition:color 400ms;
                        cursor: pointer;
                        i{
                            margin-left: 10px;
                            cursor: pointer;
                            font: 400 14px tahoma;
                            display: inline-block;
                            height: 100%;
                            vertical-align: middle;
                        }
                        &:hover{
                            color: #28a3ef;
                        }
                    }
                }
            }
            .details{
                margin-bottom: 5px;
                .sui-navbar{
                    overflow: visible;
                    margin-bottom: 0;
                    .filter{
                        min-height: 40px;
                        padding-right: 20px;
                        background: #fbfbfb;
                        border: 1px solid #e2e2e2;
                        padding-left: 0;
                        border-radius: 0;
                        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
                        .sui-nav{
                            position: relative;
                            left: 0;
                            display: block;
                            float: left;
                            margin: 0 10px 0 0;
                            li{
                                float: left;
                                line-height: 18px;
                                a{
                                    display: block;
                                    cursor: pointer;
                                    padding: 11px 15px;
                                    color: #777;
                                    text-decoration: none;
                                }
                                &.active{
                                    a{
                                        background: #e1251b;
                                        color: #fff;
                                    }
                                }
                            }
                        }
                    }
                }
                .goods-list{
                    margin: 20px 0;
                    ul{
                        display:flex;
                        flex-wrap:wrap;
                        li{
                            height: 100%;
                            width: 20%;
                            margin-top: 10px;
                            line-height: 28px;
                            .list-wrap{
                                .p-img{
                                    padding-left: 15px;
                                    width: 215px;
                                    height: 255px;
                                    a{
                                        color: #666;
                                        img{
                                            max-width: 100%;
                                            height: auto;
                                            vertical-align: middle;
                                        }
                                    }
                                }
                                .price{
                                    padding-left: 15px;
                                    font-size: 18px;
                                    color: #c81623;
                                    strong{
                                        font-weight: 700;
                                        i{
                                            margin-left: -5px;
                                        }
                                    }
                                }
                                .attr{
                                    padding-left: 15px;
                                    width: 85%;
                                    overflow: hidden;
                                    margin-bottom: 8px;
                                    min-height: 38px;
                                    cursor: pointer;
                                    line-height: 1.8;
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    -webkit-line-clamp: 2;
                                    a{
                                        color: #333;
                                        text-decoration: none;
                                    }
                                }
                                .commit{
                                    padding-left: 15px;
                                    height: 22px;
                                    font-size: 13px;
                                    color: #a7a7a7;
                                    span{
                                        font-weight: 700;
                                        color: #646fb0;
                                    }
                                }
                                .operate{
                                    padding: 12px 15px;
                                    .sui-btn{
                                        display: inline-block;
                                        padding: 2px 14px;
                                        box-sizing: border-box;
                                        margin-bottom: 0;
                                        font-size: 12px;
                                        line-height: 18px;
                                        text-align: center;
                                        vertical-align: middle;
                                        cursor: pointer;
                                        border-radius: 0;
                                        background-color: transparent;
                                        margin-right: 15px;
                                    }
                                    .btn-bordered{
                                        min-width: 85px;
                                        background-color: transparent;
                                        border: 1px solid #8c8c8c;
                                        color: #8c8c8c;
                                        &:hover{
                                            border: 1px solid #666;
                                            color: #fff!important;
                                            background-color: #666;
                                            text-decoration: none;
                                        }
                                    }
                                    .btn-danger{
                                        border: 1px solid #e1251b;
                                        color: #e1251b;
                                        &:hover{
                                            border: 1px solid #e1251b;
                                            background-color: #e1251b;
                                            color:white!important;
                                            text-decoration: none;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .hot-sale{
                margin-bottom: 5px;
                border: 1px solid #ddd;
                .title{
                    font-weight: 700;
                    font-size: 14px;
                    line-height: 21px;
                    border-bottom: 1px solid #ddd;
                    background: #f1f1f1;
                    color: #333;
                    margin: 0;
                    padding: 5px 0 5px 15px;
                }
                .hot-list{
                    padding: 15px;
                    ul{
                        display:flex;
                        li{
                            width:25%;
                            height: 100%;
                            .list-wrap{
                                .p-img,.price,.attr,.commit{
                                    padding-left: 15px;
                                }
                                .p-img{
                                    img{
                                        max-width: 100%;
                                        vertical-align: middle;
                                        border: 0;
                                    }
                                }
                                .attr{
                                    width: 85%;
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    -webkit-line-clamp: 2;
                                    overflow: hidden;
                                    margin-bottom: 8px;
                                    min-height: 38px;
                                    cursor: pointer;
                                    line-height: 1.8;
                                }
                                .price{
                                    font-size: 18px;
                                    color: #c81623;
                                    strong{
                                        font-weight: 700;
                                        i{
                                            margin-left: -5px;
                                        }
                                    }
                                }
                                .commit{
                                    height:22px;
                                    font-size: 13px;
                                    color: #a7a7a7;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
