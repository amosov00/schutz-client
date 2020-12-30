<template>
  <div class="custom-slider">
    <div class="container">
      <div class="inner">
        <div class="content-slot is-flex is-flex-direction-column">
          <slot name="content"></slot>
        </div>
        <nuxt-link
          :to="prevPage"
          class="arrow left-arrow"
        >
          <img src="~/static/slider-left.svg" />
        </nuxt-link>
        <nuxt-link
          :to="nextPage"
          class="arrow right-arrow"
        >
          <img src="~/static/slider-right.svg" />
        </nuxt-link>
      </div>
      <div class="dots" v-if="!hideDots">
        <div
          class="dot"
          :class="{active: num === activeDot}"
          v-for="num in dots"
          :key="num"
        ></div>
      </div>
      <div class="extra-text">
        <slot name="extra-text"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomSlider',
  props: {
    dots: {
      type: Number,
      default: () => 1
    },
    activeDot: {
      type: Number,
      default: () => 1
    },
    nextPage: {
      type: String,
      default: () => ''
    },
    prevPage: {
      type: String,
      default: () => ''
    },

		hideDots: {
    	type: Boolean,
			default: () => false,
		}
  },
}
</script>

<style
  scoped
  lang="scss"
>
.custom-slider {
  color: #000;
  margin-bottom: 20px;
}
.dots {
  padding: 20px 0;
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: center;
  .dot {
    width: 8px;
    height: 8px;
    border: 0.5px solid #30A1FF;
    box-sizing: border-box;
    border-radius: 50%;
    &:not(:last-child) {
      margin-right: 12px;
    }
    &.active {
      border: none;
      background: #FAD896;
    }
  }
}
.inner {
  margin-bottom: 5px;
  min-height: 560px;
  width: 100%;
  position: relative;
  height: 0;

  .content-slot {
    padding: 50px 45px;
    box-sizing: border-box;
    z-index: 1;
    width: 100%;
    background: #fff;
    height: 100%;
    position: relative;
    border-radius: 12px;
  }

  .arrow {
    position: absolute;
    top: 50%;
    width: 185px;
    height: 185px;
    cursor: pointer;
    transition: all .3s;
  }

  .left-arrow {
    left: 0;
    transform: translate(-50%, -50%) scale(1);

    &:hover {
      transform: translate(-50%, -50%) scale(1.1);
    }
  }
  .right-arrow {
    right: 0;
    transform: translate(50%, -50%) scale(1);

    &:hover {
      transform: translate(50%, -50%) scale(1.1);
    }

  }
}
</style>
