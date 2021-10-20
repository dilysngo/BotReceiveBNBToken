import { STAKING_SMART_CONTRACT, STAKING_TOKEN_CONTRACT } from '../constants'
import STAKING_CONTRACT_ABI from '../constants/abis/staking_contract_abi.json'
import STAKING_TOKEN_CONTRACT_ABI from '../constants/abis/bep20_staking_token_abi.json'


export default class ContractStaking {
  constructor() {
    this.contract = null

    this.getContract()
  }

  async getContract(ABI, address) {
    const { web3 } = window;
    if (web3?.eth) {
      this.contract = new web3.eth.Contract(ABI, address)
    }
  }

  async getListPlanInfo() {
    const contract = await this.getContract()

    console.log('PERCENTS_DIVIDER', await contract.getPlanInfo(1))

    return {
      listPlan: [],
    }
  }
}
