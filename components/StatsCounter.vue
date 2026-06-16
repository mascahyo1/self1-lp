<template>
  <span ref="target">{{ formatted }}{{ suffix }}</span>
</template>

<script setup lang="ts">
interface Props {
  /** Target value */
  end: number
  /** Animation duration in ms */
  duration?: number
  /** Decimal places */
  decimals?: number
  /** Optional suffix appended after the number (e.g. '+', '%', 'K') */
  suffix?: string
}

const props = withDefaults(defineProps<Props>(), {
  duration: 1800,
  decimals: 0,
  suffix: '',
})

const { target, formatted } = useCountUp({
  end: props.end,
  duration: props.duration,
  decimals: props.decimals,
})
</script>
