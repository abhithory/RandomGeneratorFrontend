
import React, { useState, useEffect, useContext } from 'react';
import '../css/RandomNames.css';
import { WalletContext } from '../utilities/WalletContext';
import { getContract } from '../utilities/Contract';
import { Button, Group, Text, Checkbox, Loader, Divider, ScrollArea } from '@mantine/core';
import {  IconFileSpreadsheet, IconKeyboard, IconUpload, IconX } from '@tabler/icons';
import { Dropzone, MS_EXCEL_MIME_TYPE } from '@mantine/dropzone';
import ResultCard from '../components/GenerateName/ResultCard'
import { BLOCK_EXPLORER_URL_FOR_ADDRESS } from '../constants/URLs';
import RandomGeneratorData from "../constants/RandomGeneratorData.json";
import { useTranslation } from "react-i18next";
const Excel = require('exceljs');



export default function RandomNames() {
  const [dataProcessed, setDataProcessed] = useState(false);
  const [isOwnerUser, setIsOwnerUser] = useState(false);

  const [duplicateFilter, setDuplicateFilter] = useState(false);
  const [fromFile, setFromFile] = useState(true);

  const [inputData, setInputData] = useState("");
  const [totalNames, setTotalNames] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [allNamesList, setAllNamesList] = useState(null)
  const [namesArray, setNamesArray] = useState(null);
  const [loadingSheet, setloadingSheet] = useState(false);

  const [result, setResult] = useState(null);
  const [resultLoading, setResultLoading] = useState(false);

  const { connected, provider, connectWithMetamask, automaticConnectMetamask } = useContext(WalletContext);

  const { t } = useTranslation();


  const processInputData = () => {
    var dataArray = [];

    if (fromFile) {
      if (namesArray === null) return
      dataArray = allNamesList;
    } else {
      if (inputData === "") return
      dataArray = inputData.split("\n");
    }

    dataArray = dataArray.filter(word => word.trim().length > 0);
    if (duplicateFilter) {
      dataArray = dataArray.filter(function (item, pos) {
        return dataArray.indexOf(item) == pos;
      })
    }
    setNamesArray(dataArray)
    setTotalNames(dataArray.length)
    setDataProcessed(true)
  }



  const uploadFileHandler = async (file) => {

    // const [file] = e.target.files;
    setUploadedFile(file);

    const buffer = await file.arrayBuffer();

    setloadingSheet(true);

    let workbook = new Excel.Workbook();
    workbook.xlsx.load(buffer).then((workbook) => {
      const ws = workbook.getWorksheet("Sheet1")
      const _a = []
      ws.eachRow((row) => {
        _a.push(row.values[2])
      })
      setAllNamesList(_a.slice(2))
      setNamesArray(_a.slice(2))
      setloadingSheet(false);
      setDataProcessed(false)
    });


  };

  const getRandomNumber = async () => {
    const contract = getContract(provider.getSigner());
    const tx = await contract.getRandomNumber(totalNames, totalNames);
    const txDetails = await tx.wait();
    const txHash = txDetails.transactionHash;
    const event = txDetails.events.find(event => event.event === 'RandomNumberGenerated');
    return { randomNumber: Number(event.args.randomNumber), txHash };
  }



  const pickRandomWinner = async () => {
    if (!dataProcessed) return;
    setResultLoading(true)

    try {
      const { randomNumber, txHash } = await getRandomNumber();
      const name = namesArray[randomNumber]
      const winnerData = {
        name: name,
        number: randomNumber,
        txHash: txHash
      }
      setResult(winnerData)
      setResultLoading(false);
    } catch (error) {
      console.log(error);
      setResultLoading(false)
    }
  }

   useEffect(() => {
    automaticConnectMetamask();
  }, []);

  const checkOwenrUser = async () => {
    const contract = getContract(provider.getSigner());
    const tx = await contract.isUserOwner();
    setIsOwnerUser(tx)
  }

  useEffect(() => {
    if (connected) {
      checkOwenrUser()
    }
  }, [connected])

  const buttonColor = "orange"
  return (
    !loadingSheet ?
    <>
      <div className="div-random-names">
        <div className="item-randon-names">
          <div className="input-options">
            <h2>{t('how_you_want_to_fill_data')}</h2>
            <div className="input-options-buttons">
              <Button variant={fromFile ? 'filled' : 'outline'} size='xs' color={buttonColor} onClick={() => { setFromFile(true) }} leftIcon={<IconFileSpreadsheet />}>{t('excel_file')}</Button>
              <Button variant={!fromFile ? 'filled' : 'outline'} size='xs' color={buttonColor} onClick={() => { setFromFile(false) }} leftIcon={<IconKeyboard />}>{t('input_box')}</Button>

            </div>
          </div>

          {fromFile ?
            <div>

              {uploadedFile != null && (
                <Text size="sm" align="center" mt="sm">
                  {t('picked_file')} {uploadedFile.name}
                </Text>
              )}

              <Dropzone
                onDrop={(file) => uploadFileHandler(file[0])}
                onReject={(file) => console.log('rejected files', file[0])}
                maxSize={100000000}
                maxFiles={1}
                accept={MS_EXCEL_MIME_TYPE}
              >
                <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
                  <Dropzone.Accept>
                    <IconUpload
                      size={50}
                      stroke={1.5}
                      color={buttonColor}
                    />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX
                      size={50}
                      stroke={1.5}
                      color='red'
                    />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconFileSpreadsheet size={50} stroke={1} color={buttonColor} />
                  </Dropzone.Idle>

                  <div>
                    <Text size="xl" inline color={buttonColor} weight={500}>
                      {t("drag_file_here")}
                    </Text>
                    <Text size="sm" color="dimmed" inline mt={7}>
                      {t("attach_excel")}
                    </Text>
                  </div>
                </Group>
              </Dropzone>

              {allNamesList && (
                <>
                  <h3>{t('some_names_from_file')}</h3>

                  <ScrollArea style={{ height: "10rem", backgroundColor: "white", color: "black", padding: "0 1rem" }}>

                    {(allNamesList.length > 1000 ?
                      <>
                        {
                          allNamesList.slice(0, 998).map((name, key) => {
                            return <p key={key}>{name}</p>
                          })
                        }
                        .<br />
                        .<br />
                        .<br />
                        .<br />
                        .
                      </>
                      :
                      allNamesList.map((name, key) => {
                        return <p key={key}>{name}</p>
                      })

                    )}
                  </ScrollArea>
                </>)}


            </div>
            :
            <textarea className='textarea-input-names' placeholder={t('textarea_placeholder')} value={inputData} onChange={(e) => {
              setInputData(e.target.value)
              setDataProcessed(false)
            }}>
            </textarea>
          }

        </div>

        <div className="item-randon-names">
          <div className="filters">
            <h2>{t('filters')}</h2>
            {/* <fieldset id="group1" onChange={onDataChange} >
              <input type="radio" value="comma" name="dataAddedType"  />Values are comma sparated
              <input type="radio" value="newline" name="dataAddedType" />Values are saparated by new line
            </fieldset> */}
            <div className="div-checkbox">
              <Checkbox onChange={() => { setDuplicateFilter(!duplicateFilter) }}
                color={buttonColor}
              />
              <p>{t('remove_duplicate_names')}</p>
            </div>
          </div>
          <div className="">
            <Button variant='filled' size='sm' color={buttonColor} onClick={processInputData} >{t('process_data')}</Button>
            {totalNames && (
              dataProcessed ?
                <h5>{t('total_names')} {totalNames}</h5>
                :
                <h5>{t('process_again')}</h5>
            )}
          </div>
          <Divider my='lg' />

          <div className="">
            <h3>{t('pick_ran_name')}</h3>

            {
              connected ?(
                isOwnerUser?
                  <Button variant='filled' color={buttonColor} onClick={pickRandomWinner} disabled={!dataProcessed} loading={resultLoading}>
                    {t('pick_winner')}</Button>
                    :
                    <Button variant='filled' color={buttonColor}  disabled>{t('not_allowed')}</Button>
                )
                :
                <Button variant='filled' color={buttonColor} onClick={connectWithMetamask} >
                    {t('connect_wallet')}
                    </Button>
            }
          </div>
          <Divider my='lg' />

          <div className="div-result">
            <h3>{t('result')}</h3>




            {resultLoading
              ?
              <Loader color={buttonColor} variant="bars" />
              :
              (
                result &&
            <ResultCard txHash={result.txHash} winnerName={result.name} contestName={"Random Winner"} randomNum={result.number} />

              )
            }
          </div>
        </div>
      </div>
        <Divider my='lg' mt='xl' />
      <div className="footer-random-names">
      <h3>{t('check_code_smart_contract')}</h3>
        <Button component="a" href={`${BLOCK_EXPLORER_URL_FOR_ADDRESS}${RandomGeneratorData.address}`}
                rel="noopener noreferrer"
                target="_blank" variant='filled' color={buttonColor} >{t('click_to_check')}</Button>
      </div>
      </>

      :
      <div className="loading-full">
      <h1>{t('loading')}</h1>
      <p>{t('please_wait')}</p>
      <Loader color={buttonColor} variant="bars" />

      </div>

  )
}
