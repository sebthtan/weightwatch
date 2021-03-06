import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './LineGraph.css'
import { AddCircle } from '@material-ui/icons'
import Modal from 'react-modal'
import EntryForm from '../EntryForm'
import Dropdown from './Dropdown'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

Modal.setAppElement('#root')

const LineGraph = () => {
    const dispatch = useDispatch()
    const entries = useSelector(state => state.entries)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [trackWeight, setTrackWeight] = useState('Body Weight')
    const [dataPoint, setDataPoint] = useState([])
    const [isEditFormOpen, setIsEditFormOpen] = useState(false)
    const [errors, setErrors] = useState([])
    const isBodyWeight = trackWeight === 'Body Weight'
    const isBench = trackWeight === 'Bench Press'
    const isSquat = trackWeight === 'Squat'
    const isDeadlift = trackWeight === 'Deadlift'

    const forceAnimation = (keyData) => {
        let entriesArr = []
        // for (let i = 0; i < entries.length; i++) {
        for (let key in entries) {
            let entry = entries[key]
            if (!entry) {
                continue
            } else {
                let obj = {}
                obj[keyData] = entry[keyData]
                obj['created_at'] = (new Date(entry.created_at).getTime() / 1000)
                obj['id'] = entry.id
                entriesArr.push(obj)
                entriesArr.push(obj)
            }
        }

        return entriesArr.sort((obj1, obj2) => {
            const key1 = obj1.created_at
            const key2 = obj2.created_at

            if (key1 < key2) {
                return -1
            } else if (key1 === key2) {
                return 0
            } else {
                return 1
            }
        })
    }

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add('overflow-hidden')
        } else {
            document.body.classList.remove('overflow-hidden')
        }
    }, [isModalOpen])

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '50vw'
        },
        overlay: {
            backgroundColor: 'rgba(20, 20, 20, 0.9)',
            zIndex: '21'
        }
    };

    let weightType
    let domain
    if (trackWeight === 'Body Weight') {
        weightType = 'body_weight'
        domain = [80, 'auto']
    } else if (trackWeight === 'Bench Press') {
        weightType = 'bench_press'
        domain = [45, 'dataMax + 60']
    } else if (trackWeight === 'Squat') {
        weightType = 'squat'
        domain = [45, 'dataMax + 60']
    } else if (trackWeight === 'Deadlift') {
        weightType = 'deadlift'
        domain = [45, 'dataMax + 60']
    }

    const lbs = <span style={{ color: 'rgb(234, 128, 252, 0.3' }}>(lbs)</span>

    // Do not try to refactor this; will cause infinite rerenders for some reason
    const changeToBodyWeight = () => {
        setTrackWeight('Body Weight')
        setDataPoint([])
    }

    const changeToBenchWeight = () => {
        setTrackWeight('Bench Press')
        setDataPoint([])
    }

    const changeToSquatWeight = () => {
        setTrackWeight('Squat')
        setDataPoint([])
    }

    const changeToDeadliftWeight = () => {
        setTrackWeight('Deadlift')
        setDataPoint([])
    }

    const clickedDot = (e, payload) => {
        setErrors([])
        // setIsEditFormOpen(false)
        setDataPoint(Object.keys(payload).map(key => {
            return { [key]: payload[key] }
        }))
    }

    return (
        entries && (
            <div className='container flex justify-center min-w-full p-8'>
                <div className='m-0 container w-3/5 p-4 flex flex-col items-center justify-center font-sans bg-white  bg-opacity-5 rounded-xl shadow-md border-2' style={{ borderColor: '#373737' }}>
                    <div className='container flex justify-center items-center self-end w-8 h-8 rounded-full'>
                        <button onClick={openModal} className='w-6 h-6 flex justify-center items-center'>
                            <AddCircle className='text-gray-300' style={{ color: '#fcf480' }} />
                        </button>
                    </div>
                    <Modal className='absolute' isOpen={isModalOpen} onRequestClose={closeModal} contentLabel='test' style={customStyles}>
                        <div className='container flex bg-light'>
                            <EntryForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                        </div>
                    </Modal>
                    <div className='container flex justify-between items-center pb-8'>
                        <div className='container flex flex-col justify-center items-center'>
                            <button className='flex justify-center items-center focus:outline-none' onClick={changeToBodyWeight}>
                                <h1 className='text-gray-300 text-2xl font-bold-hover font-light' style={isBodyWeight ? { fontWeight: '750', color: '#ea80fc' } : {}}>
                                    Body Weight
                        </h1>
                            </button>
                            {isBodyWeight ? lbs : <></>}
                        </div>
                        <div className='container flex flex-col justify-center items-center'>
                            <button className='flex justify-center items-center focus:outline-none' onClick={changeToBenchWeight}>
                                <h1 className='text-gray-300 text-2xl font-bold-hover font-light' style={isBench ? { fontWeight: '750', color: '#ea80fc' } : {}}>
                                    Bench Press
                        </h1>
                            </button>
                            {isBench ? lbs : <></>}
                        </div>
                        <div className='container flex flex-col justify-center items-center'>
                            <button className='flex justify-center items-center focus:outline-none' onClick={changeToSquatWeight}>
                                <h1 className='text-gray-300 text-2xl font-bold-hover font-light' style={isSquat ? { fontWeight: '750', color: '#ea80fc' } : {}}>
                                    Squat
                        </h1>
                            </button>
                            {isSquat ? lbs : <></>}
                        </div>
                        <div className='container flex flex-col justify-center items-center'>
                            <button className='flex justify-center items-center focus:outline-none' onClick={changeToDeadliftWeight}>
                                <h1 className='text-gray-300 text-2xl font-bold-hover font-light' style={isDeadlift ? { fontWeight: '750', color: '#ea80fc' } : {}}>
                                    Deadlift
                        </h1>
                            </button>
                            {isDeadlift ? lbs : <></>}
                        </div>
                    </div>
                    <ResponsiveContainer width='90%' height={300}>
                        <LineChart
                            width={800}
                            height={300}
                            data={forceAnimation(weightType)}
                        >
                            <XAxis type='number' dataKey="created_at" axisLine={false} tickLine={false} domain={["dataMin", "dataMax"]}
                                tickFormatter={(unixTime) => {
                                    let dateObj = new Date(unixTime * 1000)
                                    return `${monthNames[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getUTCFullYear()}`
                                }}
                            />
                            <YAxis domain={domain} dataKey={weightType} axisLine={false} tickLine={false} />
                            <Line connectNulls={true} animationDuration={800} type="monotone" dataKey={weightType} stroke="#ea80fc" yAxisId={0} activeDot={{ stroke: '#fcf480', onClick: clickedDot }} />
                            <CartesianGrid vertical={false} strokeDasharray='3' />
                            {/* {!isDropdownOpen && */}
                            <Tooltip className='text-gray' labelFormatter={(unixTime) => {
                                let dateObj = new Date(unixTime * 1000)
                                return `${monthNames[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getUTCFullYear()}`
                            }} />
                        </LineChart>
                    </ResponsiveContainer>
                    {dataPoint.length > 0 && (
                        <Dropdown
                            trackWeight={trackWeight}
                            dataPoint={dataPoint}
                            setDataPoint={setDataPoint}
                            monthNames={monthNames}
                            isEditFormOpen={isEditFormOpen}
                            setIsEditFormOpen={setIsEditFormOpen}
                            errors={errors}
                            setErrors={setErrors}
                        />
                    )}

                    {/* <div className='container flex items-center w-full justify-around text-gray-300'>
                <button className='focus:outline-none flex justify-center items-center font-bold' >
                <span>1M</span>
                </button>
                <button className='focus:outline-none flex justify-center items-center font-bold'>
                <span>6M</span>
                </button>
                <button className='focus:outline-none flex justify-center items-center font-bold'>
                <span>1Y</span>
                    </button>
                    <button className='focus:outline-none flex justify-center items-center font-bold'>
                    <span>All</span>
                    </button>
                </div> */}
                </div>
            </div>
        )
    )
}

export default LineGraph
