import { useQuery } from "@apollo/client";
import { Fragment, FunctionComponent, useCallback, useEffect, useState } from "react";
import { Platform, SafeAreaView, ScrollView, StatusBar } from "react-native";
import TransactionHeader from "../components/headers/transaction-header";
import TransactionItems from "../components/items/transaction-item";
import TransactionMenu from "../components/menu/transaction-menu";
import { GetTransactionsData, GET_TRANSACTIONS } from "../graphql/queries/transaction";
import { TransactionStatus } from "../types/enums/transaction";
import { TransactionInterface } from "../types/interfaces/transaction";

interface TransactionScreenProps {

}

const TransactionScreen: FunctionComponent<TransactionScreenProps> = () => {
    const [transactions, setTransactions] = useState<TransactionInterface[]>([])
    const [status, setStatus] = useState<TransactionStatus>(TransactionStatus.Locked)

    const { data, loading, error, refetch } = useQuery<GetTransactionsData>(GET_TRANSACTIONS, {
        variables: {
            status
        },
        notifyOnNetworkStatusChange: true
    })

    useEffect(() => {
        if(data && !error) {
            setTransactions(data.transactions)
        }
    }, [data, error])

    const reload = useCallback(() => {
        refetch()
    }, [refetch])

    const onSelectMenu = useCallback((stack: TransactionStatus) => {
        setStatus(stack)
    }, [status])

    return (
        <Fragment>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#ffb41f' }} />
            <SafeAreaView style={{
                flex: 1
            }}>
                <TransactionHeader onReload={() => reload()}/>
                <TransactionMenu onChangeMenu={onSelectMenu} status={status} />
                <TransactionItems items={transactions}/>
            </SafeAreaView>
        </Fragment>
    );
}

export default TransactionScreen;