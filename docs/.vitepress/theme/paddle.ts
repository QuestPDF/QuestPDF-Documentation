import {initializePaddle, Paddle, Environments} from '@paddle/paddle-js';
import {ref} from "vue";
import {useData} from "vitepress";


/* Configuration */

const sandboxConfiguration = {
  isProduction: false,
  token: 'test_42032b2ff8076c730cbd2680e0d',
  professionalLicenseId: 'pri_01jv41j5bk9jb3sqxstc8me53x',
  enterpriseLicenseId: 'pri_01j1j2fx3cnbmf4r1816atx35g',
};

const productionConfiguration = {
    isProduction: true,
    token: 'live_aae6e100288a0ab158a101d61e6',
    professionalLicenseId: 'pri_01jv2s874sbfd4t79p8k6vcmmk',
    enterpriseLicenseId: 'pri_01jv41gn76w6ygdxfqxb6dv525',
};


/* Configuration selector */

const configuration = productionConfiguration;


/* Implementation */

const paddle = ref<Paddle | null>(null);

if (typeof window !== 'undefined') {
  initializePaddle({
    token: configuration.token,
    environment: configuration.isProduction ? 'production' : 'sandbox',
  })
    .then(x => paddle.value = x)
}

export const usePaddle = () => {
  const {isDark} = useData();

  function startCheckout(priceId: string) {
    paddle.value.Checkout.open({
      settings: {
        variant: 'one-page',
        theme: isDark.value ? 'dark' : 'light',
        displayMode: 'overlay',
        showAddTaxId: true,
        showAddDiscounts: true,
        successUrl: "https://www.questpdf.com/license/purchase-success.html"
      },
      items: [
        {
          priceId: priceId,
          quantity: 1
        }
      ]
    });
  }

  return {
    startCheckout,
    professionalLicensePriceId: configuration.professionalLicenseId,
    enterpriseLicensePriceId: configuration.enterpriseLicenseId,
  };
}
