<template>
	<div>
		<div class="wel__header">
			<div class="wel__info">
				<img :src="userInfo.avatar" alt="" class="wel__info-img" />
				<div class="wel__info-content">
					<div class="wel__info-title">
						{{ $t('wel.info') }}
					</div>
					<div class="wel__info-subtitle">
						{{ $t('wel.dept') }}
					</div>
				</div>
			</div>
			<div class="wel__extra">
				<div class="wel__extra-item">
					<p class="wel__extra-title">
						{{ $t('wel.count') }}
					</p>
					<p class="wel__extra-subtitle">56</p>
				</div>
				<div class="wel__extra-item">
					<p class="wel__extra-title">
						{{ $t('wel.team') }}
					</p>
					<p class="wel__extra-subtitle">8 <span>/ 24</span></p>
				</div>
				<div class="wel__extra-item">
					<p class="wel__extra-title">
						{{ $t('wel.project') }}
					</p>
					<p class="wel__extra-subtitle">2,223</p>
				</div>
			</div>
		</div>
	</div>
	<basic-container>
		<dashboard></dashboard>
	</basic-container>
</template>

<script lang="ts" setup>
import dashboard from './dashboard.vue';
import { useUserStore } from 'store/index';
import { computed, getCurrentInstance } from 'vue';

const uStore = useUserStore();

const userInfo = computed(() => {
	return uStore.getUserInfo;
});
console.log(getCurrentInstance());
</script>

<style scoped="scoped" lang="scss">
.wel {
	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 25px 40px;
		background-color: #ffffff;
		border-bottom: 1px solid #e8e8e8;
	}
	&__info {
		display: flex;
		align-items: center;
		&-img {
			display: block;
			width: 72px;
			height: 72px;
			border-radius: 72px;
			img {
				display: block;
				width: 100%;
				height: 100%;
			}
		}
		&-content {
			position: relative;
			margin-left: 24px;
			line-height: 22px;
			color: rgb(0 0 0 / 45%);
		}
		&-title {
			margin-bottom: 12px;
			font-size: 20px;
			font-weight: 500;
			line-height: 28px;
			color: rgb(0 0 0 / 85%);
		}
		&-subtitle {
			position: relative;
			font-size: 14px;
			line-height: 22px;
			color: rgb(0 0 0 / 45%);
		}
	}
	&__extra {
		&-item {
			position: relative;
			display: inline-block;
			padding: 0 32px;
			&:last-child {
				&::after {
					display: none;
				}
			}
			&::after {
				position: absolute;
				top: 30px;
				right: 0;
				width: 1px;
				height: 40px;
				content: '';
				background-color: #e8e8e8;
			}
		}
		&-title {
			margin-bottom: 4px;
			font-size: 14px;
			line-height: 22px;
			color: rgb(0 0 0 / 45%);
		}
		&-subtitle {
			margin: 0;
			font-size: 30px;
			line-height: 38px;
			color: rgb(0 0 0 / 85%);
			span {
				font-size: 20px;
				color: rgb(0 0 0 / 45%);
			}
		}
	}
}
</style>
