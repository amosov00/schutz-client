import {LEGAL_DOC_TYPE} from "~/consts";

export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
	async fetchLegalDoc({}, docType) {
		let response;
		if (docType === LEGAL_DOC_TYPE.LIMITATIONS || docType === LEGAL_DOC_TYPE.PRIVACY) {
			response = await this.$axios.get("/meta/legal-docs/other/", {
				params: {
					type: docType
				}
			})
		} else if (docType === LEGAL_DOC_TYPE.TERMS) {
			response = await this.$axios.get("/meta/legal-docs/terms-and-conditions/")
		} else {
			throw new Error("invalid docType")
		}
		return response.data
	}
};
