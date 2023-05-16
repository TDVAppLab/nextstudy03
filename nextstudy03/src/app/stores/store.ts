import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import TlestringStore from "./TlestringStore";

interface Store{
    commonStore: CommonStore;
    //userStore: UserStore;
    //modalStore: ModalStore;
    //siteAnalyticsStore: SiteAnalyticsStore;
    tlestringStore: TlestringStore;    
}

export const store: Store={
    commonStore: new CommonStore(),
    //userStore: new UserStore(),
    //modalStore: new ModalStore(),
    //siteAnalyticsStore: new SiteAnalyticsStore(),    
    tlestringStore: new TlestringStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}