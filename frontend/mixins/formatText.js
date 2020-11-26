export function hashSlice(value) {
  if(!value || value.length < 12 ) {
    return value
  }
  return `${value.slice(0, 8)}...${value.slice(-4)}`
}


export default {
  methods: {
    hashSlice
  }
};
