/* eslint-disable react/jsx-no-undef */
import dynamic from "next/dynamic";
const Layout = dynamic(() => import('../../components/layout/Layout'),{csr: true});
const HeadContent = dynamic(() => import('../../components/HeadContent'),{csr: true});
const HeadTitle = dynamic(() => import('../../components/HeadTitle'),{csr:true});
const Tabs = dynamic(() => import('antd').then((antd) => antd.Tabs),{csr: true})
const Modal = dynamic(() => import('antd').then((antd) => antd.Modal),{csr: true})
const Steps = dynamic(() => import('antd').then((antd) => antd.Steps),{csr: true})
const message = dynamic(() => import('antd').then((antd) => antd.message),{csr: true})
const Form = dynamic(() => import('antd').then((antd) => antd.Form),{csr: true})
const Button = dynamic(() => import('antd').then((antd) => antd.Button),{csr: true})
const Slider = dynamic(() => import('antd').then((antd) => antd.Slider),{csr: true})
const Input = dynamic(() => import('antd').then((antd) => antd.Input),{csr: true})
const Select = dynamic(() => import('antd').then((antd) => antd.Select),{csr: true})
import {theme} from 'antd'
import {Card} from 'antd';
import {useState, useRef} from "react";
import {useEffect} from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import _ from 'lodash';
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
const TabPane = Tabs.TabPane;


const ScenarioBuilder = () => {
  const apiAddress = process.env.NEXT_PUBLIC_API_ADDRESS;
  const router = useRouter();
  const [transAttr, setTransAttr] = useState([]);
  const [source, setSource] = useState([]);
  const [trace, setTrace] = useState(0);
  const [contains, setContains] = useState([]);
  const [aggregate, setAggregate] = useState([]);
  const [statement, setStatement] = useState([]);
  const [comparison, setComparison] = useState([]);
  const [dataFormulaStaging, setDataFormulaStaging] = useState([]);
  const [transAttr2, setTransAttr2] = useState([]);
  const [source2, setSource2] = useState([]);
  const [trace2, setTrace2] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState([]);
  const [displayText, setDisplayText] = useState('');
  const [ruleId, setRuleId] = useState(null);
  const [ruleName, setRuleName] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(''); 
  const [riskValue, setRiskValue] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [priority, setPriority] = useState('');
  const [type, setType] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('');
  const [stateRule, setStateRule] = useState('');
  const [ruleGroup, setRuleGroup] = useState('');
  const [ruleBodies, setRuleBodies] = useState('');
  const [ruleHistory, setRuleHistory] = useState('');
  const [sFormula, setSFormula] = useState('');
  const formRef = useRef();
  const [isDoneClicked, setIsDoneClicked] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [transDataAttr, setTransDataAttr] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [selectedKey, setSelectedKey] = useState(null);

const content2 = selectedKey ? parseInt(selectedKey) : null;
const handleButtonClick = (e) => {
    const key = e.target.id;
    setSelectedKey(key);
    // console.log(key);
};

const [isClicked, setIsClicked] = useState(false);
const handleCardClick = (key) => {
setSelectedKey(key);
setIsClicked(true);
// console.log(key);
}
const data = [
    {
      key: 1,
      title: 'Containts',
    //   caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum neque leo, aliquet eu condimentum id, blandit at eros. Ut mollis et leo non facilisis. Cras.'
      caption : 'Comparing the rules with the existed Fraud List.'
    },
    {
      key: 2,
      title: 'Aggregate',
    //   caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum neque leo, aliquet eu condimentum id, blandit at eros. Ut mollis et leo non facilisis. Cras.'
      caption : 'Detect transactions that exceed a specified threshold with an aggregate value calculated at certain time intervals' 
    },
    {
      key: 3,
      title: 'Statement',
    //   caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum neque leo, aliquet eu condimentum id, blandit at eros. Ut mollis et leo non facilisis. Cras.'
      caption : 'Compares transaction values with certain statement.'
    },
    {
      key: 4,
      title: 'Common',
    //   caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum neque leo, aliquet eu condimentum id, blandit at eros. Ut mollis et leo non facilisis. Cras.'
      caption : 'Compares two transaction values'
    }
];

const [operator, setOperator] = useState([]);
const [counterOpr, setCounterOpr] = useState(0);

  
const incrementCounterOpr = () => {
  setCounterOpr(counterOpr + 1);
};

const handleClick = (key) => {
  let newOperator;

  if (key === "1") {
    newOperator = {
      id: 'O0'+counterOpr,
      text: 'AND'
    };
  } else if (key === "2") {
    newOperator = {
      id: 'O0'+counterOpr,
      text: 'OR'
    };
  } else if (key === "3") {
    newOperator = {
      id:  'O0'+counterOpr,
      text: '('
    };
  } else if (key === "4") {
    newOperator = {
      id: 'O0'+counterOpr,
      text: ')'
    };
  }

  if (newOperator) {
    setOperator(prevOperator => [...prevOperator, newOperator]);
  }
};

const [counter, setCounter] = useState(0);

const incrementCounter = () => {
setCounter(counter + 1);
};

const onFinishDataFormula = (values) => {
    console.log(values);
    if(content2 === 1){
        setDataFormulaStaging([...dataFormulaStaging,{
            id: counter,
            conditionId: 'F0'+counter,
            detailCondition: `TransAttr:${values.transAttr},Source:${values.source},Trace:${values.trace} CONSTAINS FraudList:${values.contains}`,
            condition: "Contains",
            amountOrSysdate: false,
            fraudListCheck: false,
            limit: false,
            bindingId: 2,
        }])
        setIsModalOpen(false)
    }else if(content2 === 2){
        setDataFormulaStaging([...dataFormulaStaging,{
            id: counter,
            conditionId: 'F0'+counter,
            detailCondition: `TransAttr:${values.transAttr},Source:${values.source},AggregateId:${values.aggregate} ${values.comparison} ${values.trace}`,
            condition: "Aggregate",
            amountOrSysdate: false,
            fraudListCheck: false,
            limit: false,
            bindingId: 2,
          }])
          setIsModalOpen(false)
    }else if(content2 === 3){
        setDataFormulaStaging([...dataFormulaStaging,{
            id: counter,
            conditionId: 'F0'+counter,
            detailCondition: `TransAttr:${values.transAttr},Source:${values.source},Trace:${values.trace} ${values.comparison} ${values.statement}`,
            condition: "Statement",
            amountOrSysdate: false,
            fraudListCheck: false,
            limit: false,
            bindingId: 2,
        }])
        setIsModalOpen(false)
    }else if(content2 === 4){
        // console.log(values);
    setDataFormulaStaging([...dataFormulaStaging,{
        id: counter,
        conditionId: 'F0'+counter,
        detailCondition: `TransAttr:${values.transAttr},Source:${values.source},Trace:${values.trace} ${values.comparison} TransAttr:${values.transAttr2},Source:${values.source2},Trace:${values.trace2}`,
        condition: "Common",
        amountOrSysdate: false,
        fraudListCheck: false,
        limit: false,
        bindingId: 2,
    }])
    if(values.transAttr === 'sysdate' || values.transAttr === 'amount'){
        setDataFormulaStaging([...dataFormulaStaging,{
            id: counter,
            conditionId: 'F0'+counter,
            detailCondition: `TransAttr:${values.transAttr},Source:${values.source},Trace:${values.trace} ${values.comparison} TransAttr:${values.transAttr2},Source:${values.source2},Trace:${values.trace2} ${values.statement}`,
            condition: "Aritmathic",
            amountOrSysdate: false,
            fraudListCheck: false,
            limit: false,
            bindingId: 2,
        }])
    }
    setIsModalOpen(false)
  };

};

const getItem = () => {
    setItem(dataFormulaStaging);
    // setHandleOpr(operator);
};
useEffect(() => {
    setState((prevState) => ({
        ...prevState,
        formula: {
        ...prevState.formula,
        items: item,
        },
        studio: {
            ...prevState.studio,
            operators: operator
            },
    }));
}, [item, operator]);

useEffect(() => {
getItem();
}, [dataFormulaStaging, operator]);

const handleFormReset = () => {
    formRef.current.resetFields();
}
const onFinishContaint = (values) => {
    // Set state dengan hasil form onFinish
    setTransAttr(values.transAttr);
    setSource(values.source);
    setContains(values.contains);
    setTrace(values.trace);
    handleFormReset();
    setCurrentStep(0);
};
const onFinishAggregate = (values) => {
    setTransAttr(values.transAttr);
    setSource(values.source);
    setAggregate(values.aggregate);
    setTrace(values.trace);
    handleFormReset();
    setCurrentStep(0);
}
const onFinishStatement = (values) => {
    setTransAttr(values.transAttr);
    setSource(values.source);
    setStatement(values.statement);
    setTrace(values.trace);
    handleFormReset();
    setCurrentStep(0);
}
const onFinishCommon = (values) => {
    console.log(values);
    setTransAttr(values.transAttr);
    setSource(values.source);
    setTrace(values.trace);
    setComparison(values.comparison);
    setTransAttr2(values.transAttr2);
    setSource2(values.source2);
    setTrace2(values.trace2);
    setStatement(values.statement)
    handleFormReset();
    setCurrentStep(0);
}
const onFinish = (values) => {
    if (content2 === 1) {
        onFinishDataFormula(values);
        onFinishContaint(values);
    }else if (content2 === 2){
        onFinishDataFormula(values);
        onFinishAggregate(values);
    }else if (content2 === 3){
        onFinishDataFormula(values);
        onFinishStatement(values);
    }else if(content2 === 4){
        onFinishDataFormula(values);
        onFinishCommon(values);
    }
};

// Logic for selected option
const handleOptionChange = (value) => {
    setSelectedOption(value);
    // console.log(value);
    setShowForm(value === 'sysdate' || value === 'amount');
    // 28 == SYSDATE
    // 4 == AMOUNT
}

// Get TransData Attribute
useEffect(() => {
    getTransDataAttrs();
}, []);

const getTransDataAttrs = async() => {
    const res = await axios.get(`http://${apiAddress}/transDataAttr/list`).then(
        res => {
            // console.log(res.data.responseData);
            setLoading(false);
            setTransDataAttr(
                res.data.responseData.map(row => ({
                    attribute: row.attribute,
                    attrId: row.attrId
                }))
            )
        }
    )
}

//   Staging
const steps = [
{
    title: 'first',
    content: data.map((item) => (
        // eslint-disable-next-line react/jsx-key
        <Card id={item.key} onClick={() => handleCardClick(item.key)} 
        style=
        {{
            border: selectedKey === item.key ? '1px solid #005752' : 'none'
        }}
        className='hover:scale-110 hover:transition-transform hover:delay-100 hover:duration-300 p-2 h-[150px] w-[450px] max-w-sm flex flex-col gap-5'
        >
            <button onClick={handleButtonClick}  id={item.key}>
            <div className="flex items-center gap-4"> 
            <Image src="/images/rules.jpg" width={40} height={40} alt="" id={item.key} className="rounded-md"/>
            <h1 className='font-poppins text-left' id={item.key}>{item.title}</h1>

                </div>
            <p className='font-poppins text-left' id={item.key}>{item.caption}</p>
            {/* Fadhiil change : mt-1 */}
            </button>
        </Card>
    ))
},
{
    title: 'second',
    content: (() => {
    // console.log(content2);
    if(content2 === 1){
        return <Card 
        title="Containt" 
        className='w-full'>
        <Form
        ref={formRef}
        name="basic"
        style={{
            width: '100%',
            padding: '0 2rem'
        }}
        initialValues={{
            transAttr: transAttr,
            source: source,
            contains: contains,
            trace: trace,
        }}
        autoComplete="off"
        layout="vertical"
        onFinish={onFinish}
        className='my-10'
        >
        <div className="flex gap-5 w-full">
            <div className='flex flex-col w-1/2 border-[1px] p-4 rounded-lg'>
                <div className='w-full'>
                <Form.Item
                    name="transAttr"
                    label="Transaction Attribute"
                    className='w-full'
                    onChange={(value) => setTransAttr(value)}
                >
                    <Select
                    placeholder="Select Transaction Attribute"
                    allowClear
                    >
                        {transDataAttr.map(option => (
                                <option key={option.attrId} value={option.attribute}>
                                    {option.attribute}
                                </option>
                        ))}
                    </Select>
                </Form.Item>
                </div>
                <div className='w-full'>
                <Form.Item
                    name="source"
                    label="Source"
                    onChange={(value) => setSource(value)}
                >
                    <Select
                    placeholder="Select Source"
                    allowClear
                    >
                    <Option value="card">card</Option>
                    </Select>
                </Form.Item>
                </div>
                <div className='w-full'>
                <Form.Item label="Trace" className='w-full'>
                    <Form.Item
                    name="trace"
                    noStyle
                    >
                    <Slider 
                        max={10}
                        defaultValue={0}
                        onChange={(value) => setTrace(value)}
                    />
                    </Form.Item>
                </Form.Item>
                </div>
            </div>
                <div className='w-1/2 border-[1px] p-4 rounded-lg'>
                <Form.Item
                    name="contains"
                    label="Contains"
                    onChange={(value) => setContains(value)}
                >
                    <Select
                    placeholder="Select Contains"
                    allowClear
                    >
                    <Option value="testList">testList</Option>
                    </Select>
                </Form.Item>
                </div>
            </div>

            <div className="flex justify-end pt-4">
        <Button type="primary" htmlType="submit" onClick={() => {
            incrementCounter();
        }}>
            Done
        </Button>
            </div>
        </Form>
    </Card>    
    }else if(content2 === 2){
        return <Card 
        title="Aggregate" 
        className='w-full'>
        <Form
            ref={formRef}
            name="basic"
            style={{
            width: '100%',
            padding: '0 2rem',
            }}
            initialValues={{
            transAttr: transAttr,
            source: source,
            aggregate: aggregate,
            trace: trace,
            comparison: comparison,
            }}
            autoComplete="off"
            layout="vertical"
            onFinish={onFinish}
            className='my-16'
        >
            <div className="flex gap-5 w-full">
                <div className="flex flex-col w-full border-[1px] rounded-lg p-4">
                    <div className='w-full'>
                        <Form.Item
                            name="transAttr"
                            label="Transaction Attribute"
                            className='w-full'
                            onChange={(value) => setTransAttr(value)}
                        >
                            <Select
                                placeholder="Select Transaction Attribute"
                                allowClear
                            >
                                {
                                    transDataAttr.map(option => (
                                        <option key={option.attrId} value={option.attrId}>
                                            {option.attribute}
                                        </option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </div>
                    <div className='w-full'>
                        <Form.Item
                            name="source"
                            label="Source"
                            onChange={(value) => setSource(value)}
                        >
                            <Select
                                placeholder="Select Source"
                                allowClear
                            >
                                <Option value="card">card</Option>
                            </Select>
                        </Form.Item>
                    </div>
                    <div className='w-full'>
                        <Form.Item label="Trace" className='w-full'>
                            <Form.Item
                                name="trace"
                                noStyle
                            >
                                <Slider
                                    max={10}
                                    defaultValue={0}
                                    onChange={(value) => setTrace(value)}
                                />
                            </Form.Item>
                        </Form.Item>
                    </div>
                    <div className='w-full'>
                        <Form.Item
                            name="comparison"
                            label="Comparison"
                            onChange={(value) => setComparison(value)}>
                            <Select
                                placeholder="Select Comparison"
                                allowClear
                            >
                                <Option value="==">==</Option>
                                <Option value="=>">={'>'}</Option>
                                <Option value="=<">={'<'}</Option>
                                <Option value="!=">!=</Option>
                            </Select>
                        </Form.Item>
                    </div>
                </div>

                <div className='w-full border-[1px] rounded-lg p-4'>
                    <Form.Item
                        name="aggregate"
                        label="Aggregate"
                        onChange={(value) => setAggregate(value)}>
                        <Select
                            placeholder="Select Aggregate"
                            allowClear
                        >
                            <Option value="1">aggregate kesatu</Option>
                        </Select>
                    </Form.Item>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <Button type="primary" htmlType="submit" onClick={() => {
                    incrementCounter();
                }}>
                    Done
                </Button>
            </div>
        </Form>
        </Card>    
    }else if(content2 === 3){
        return <Card 
        title="Statement" 
        className='w-full'>
        <Form
            ref={formRef}
            name="basic"
            style={{
            width: '100%',
            padding: '0 2rem',
            }}
            initialValues={{
            transAttr: transAttr,
            source: source,
            comparison: comparison,
            trace: trace,
            statement: statement,
            }}
            autoComplete="off"
            layout="vertical"
            onFinish={onFinish}
            className='my-10'
        >

            <div className="flex gap-5 w-full">
                <div className='flex flex-col w-full border-[1px] rounded-lg p-4'>
                    <div className='w-full'>
                        <Form.Item
                            name="transAttr"
                            label="Transaction Attribute"
                            className='w-full'
                            onChange={(value) => setTransAttr(value)}
                        >
                            <Select
                                placeholder="Select Transaction Attribute"
                                allowClear
                            >
                                {
                                    transDataAttr.map(option => (
                                        <option key={option.attrId} value={option.attrId}>
                                            {option.attribute}
                                        </option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </div>
                    <div className='w-full'>
                        <Form.Item
                            name="source"
                            label="Source"
                            onChange={(value) => setSource(value)}
                        >
                            <Select
                                placeholder="Select Source"
                                allowClear
                            >
                                <Option value="card">card</Option>
                            </Select>
                        </Form.Item>
                    </div>
                    <div className='w-full'>
                        <Form.Item
                            name="comparison"
                            label="Comparison"
                            onChange={(value) => setComparison(value)}>
                            <Select
                                placeholder="Select Comparison"
                                allowClear
                            >
                                <Option value="==">==</Option>
                                <Option value="=>">={'>'}</Option>
                                <Option value="=<">={'<'}</Option>
                                <Option value="!=">!=</Option>
                            </Select>
                        </Form.Item>
                    </div>
                    <div className='w-full'>
                        <Form.Item label="Trace" className='w-full'>
                            <Form.Item
                                name="trace"
                                noStyle
                            >
                                <Slider
                                    max={10}
                                    defaultValue={0}
                                    onChange={(value) => setTrace(value)}
                                />
                            </Form.Item>
                        </Form.Item>
                    </div>
                </div>

                <div className='w-full border-[1px] rounded-lg p-4'>
                    <Form.Item label="Statement" className='w-full'>
                        <Form.Item
                            name="statement"
                            noStyle
                        >
                            <Input type='text' onChange={(value) => setStatement(value)}/>
                        </Form.Item>
                    </Form.Item>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <Button type="primary" htmlType="submit" onClick={() => {
                    incrementCounter();
                }}>
                    Done
                </Button>
            </div>
        </Form>
        </Card>    
    }else if(content2 === 4){
        return <Card 
        title="Common" 
        className='w-full'>
        <Form
            ref={formRef}
            name="basic"
            style={{
            width: '100%',
            padding: '0 2rem',
            }}
            initialValues={{
            transAttr: transAttr,
            source: source,
            trace: trace,
            transAttr2: transAttr2,
            source2: source2,
            trace2: trace2,
            state: statement
            }}
            autoComplete="off"
            layout="vertical"
            onFinish={onFinish}
            className='my-10'
        >
            <div className="border-[1px] w-full rounded-lg p-4">

            <div className='w-full'>
                <Form.Item
                    name="transAttr"
                    label="Transaction Attribute"
                    className='w-full'
                    onChange={(value) => setTransAttr(value)}
                >
                    <Select
                        placeholder="Select Transaction Attribute"
                        allowClear onChange={handleOptionChange} value={selectedOption}
                    >
                        {
                            transDataAttr.map(option => (
                                <option key={option.attrId} value={option.attribute}>
                                    {option.attribute}
                                </option>
                            ))
                        }
                    </Select>
                </Form.Item>
            </div>
            <div className='flex gap-5'>
                <div className='w-full'>
                    <Form.Item
                        name="source"
                        label="Source"
                        onChange={(value) => setSource(value)}
                    >
                        <Select
                            placeholder="Select Source"
                            allowClear
                        >
                            <Option value="card">card</Option>
                        </Select>
                    </Form.Item>
                </div>
                <div className='w-full'>
                    <Form.Item label="Trace" className='w-full'>
                        <Form.Item
                            name="trace"
                            noStyle
                        >
                            <Slider
                                max={10}
                                defaultValue={0}
                                onChange={(value) => setTrace(value)}
                            />
                        </Form.Item>
                    </Form.Item>
                </div>
            </div>
        </div>
            <div className='flex gap-5'>
            <div className='w-full'>
                <Form.Item                      
                name="comparison"
                label="Comparison"
                onChange={(value) => setComparison(value)}>
                <Select
                    placeholder="Select Comparison"
                    allowClear
                >
                    <Option value="==">==</Option>
                    <Option value="=>">={'>'}</Option>
                    <Option value="=<">={'<'}</Option>
                    <Option value="!=">!=</Option>
                </Select>
                </Form.Item>
            </div>
            {/* If Selected Attribute = amount or sysdate */}
            {
                showForm && (
                    <div className='w-full'>
                    <Form.Item label="Statement" className='w-full'>
                        <Form.Item
                            name="statement"
                            noStyle
                        >
                            <Input type='text' onChange={(value) => setStatement(value)}/>
                        </Form.Item>
                    </Form.Item>
                    </div>
                )
            }
            </div>
            <div className="border-[1px] w-full rounded-lg p-4">

                <div className='w-full'>
                    <Form.Item
                        name="transAttr2"
                        label="Transaction Attribute"
                        className='w-full'
                        onChange={(value) => setTransAttr2(value)}
                    >
                        <Select
                            placeholder="Select Transaction Attribute"
                            allowClear onChange={handleOptionChange} value={selectedOption}
                        >
                            {
                                transDataAttr.map(option => (
                                    <option key={option.attrId} value={option.attribute}>
                                        {option.attribute}
                                    </option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                </div>
                <div className='flex gap-5'>
                    <div className='w-full'>
                        <Form.Item
                            name="source2"
                            label="Source"
                            onChange={(value) => setSource2(value)}
                        >
                            <Select
                                placeholder="Select Source"
                                allowClear
                            >
                                <Option value="card">card</Option>
                            </Select>
                        </Form.Item>
                    </div>
                    <div className='w-full'>
                        <Form.Item label="Trace" className='w-full'>
                            <Form.Item
                                name="trace2"
                                noStyle
                            >
                                <Slider
                                    max={10}
                                    defaultValue={0}
                                    onChange={(value) => setTrace2(value)}
                                />
                            </Form.Item>
                        </Form.Item>
                    </div>
                </div>
            </div>
            <div className="flex justify-end pt-4">
                <Button type="primary" htmlType="submit" onClick={() => {
                    incrementCounter();
                }}>
                    Done
                </Button>
            </div>
        </Form>
        </Card>    
        }
    })()
},
];
  const {token} = theme.useToken();
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
};
  const prev = () => {
    setCurrent(current - 1);
};
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
}));
  const contentStyle = {
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: '1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '4rem 2rem',
    gap: '2rem',
    height: '100%'
};
// End Staging

  const [state, setState] = useState({
    formula: {
      title: "Formula Container",
      items: [],
      operators: [],
    },
    studio: {
      title: "Studio Container",
      items: [],
      operators: [],
    },
  });
  
  const handleDragEnd = ({ destination, source }) => {
    if (!destination) {
      return;
    }
    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return;
    }

    const { droppableId: sourceDroppableId, index: sourceIndex } = source;
    const { droppableId: destinationDroppableId, index: destinationIndex } = destination;
  
    setState(prevState => {
      const updatedState = { ...prevState };
  
      // Mengambil item atau operator yang akan di-drag
      const itemOrOperatorToMove = prevState[sourceDroppableId].items[sourceIndex] || prevState[sourceDroppableId].operators[sourceIndex];
  
      // Menghapus item atau operator dari posisi sumber
      if (prevState[sourceDroppableId].items.length > 0) {
        updatedState[sourceDroppableId].items.splice(sourceIndex, 1);
      } else {
        updatedState[sourceDroppableId].operators.splice(sourceIndex, 1);
      }
  
      // Menyisipkan item atau operator ke posisi tujuan
      if (prevState[destinationDroppableId].items.length > 0) {
        updatedState[destinationDroppableId].items.splice(destinationIndex, 0, itemOrOperatorToMove);
      } else {
        updatedState[destinationDroppableId].operators.splice(destinationIndex, 0, itemOrOperatorToMove);
      }
  
      return updatedState;
    });
    // console.log(state);
  };
  
  const handleAddData = async () => {
    try {

        const itemOperators = state.studio.operators;

        const separatedOperators = itemOperators.reduce((result, item) => {
          if (item.id.toString().indexOf("O") !== -1) {
            result.withO.push(item);
          } else {
            result.withoutO.push(item);
          }
          return result;
        }, { withO: [], withoutO: [] });
        
        const dataOperator = separatedOperators.withO.map(item => item.text);
        const dataFormula = separatedOperators.withoutO.map(item => item.detailCondition);
        const dataRuleBodies = separatedOperators.withoutO;

        const combinedData = itemOperators.map((item, index) => {
          if (item.id.toString().indexOf("O") !== -1) {
            return dataOperator.shift();
          } else {
            return dataFormula.shift();
          }
        });
        const combinedDataString = combinedData.join(', ');

      const dataNew = {
        ruleName,
        description,
        isActive: true,
        riskValue,
        dateFrom,
        dateTo,
        priority: 0,
        type: 1,
        author: 'admin',
        status: 'Waiting Confirmation',
        state: 'APPROVED',
        ruleGroup:{
            id: 62
        },
        sformula: combinedDataString,
        ruleBodies: dataRuleBodies
      };
      console.log(dataNew);
      const res = await axios.post(`http://${apiAddress}/rule/add`, dataNew);
      setRuleName('');
      setDescription('');
      setRiskValue('');
      setDateFrom('');
      setDateTo('');
      setSFormula('');
      router.push('/Scenario/ScenarioStudio')
      if(res.data.responseCode == 200){
          message.open({
              content: 'Data Added Successfully',
              type:'success',
              duration: 3
          });
      }else{
          message.open({
              content: res.data.responseMessage,
              type: 'error',
              duration: 3
          });
      }
    } catch (error) {
        console.error(error);
    }
}
  
return (
    <Layout>
        <HeadTitle title="Scenario Builder"/>
        <HeadContent pageTitle="Scenario Builder" caption="Build your own rules with drag and drop concept."/>
        <div className="flex flex-col gap-5 h-full mt-5">
            <div className="bg-white h-full rounded-lg">
                <Tabs>
                    <TabPane tab="Rule" key="1">
                    <form className='font-poppins font-medium w-full h-full' onSubmit={handleAddData}>
                        <div className="font-poppins flex justify-between px-5 py-6">
                            <div className="w-1/2 flex flex-col">
                                <span className="mb-5 font-bold text-secondary text-xl">Rule</span>
                                <span className="font-semibold">Rule Parameters</span>
                                {/* <p className="text-xs text-black text-opacity-50">lorem dakasdasfafasffsa
                                    aasfafa</p> */}
                            </div>
                                <div className="text-sm w-1/2">
                                    <div className='flex gap-10'>
                                        <div className="mt-4 w-full">
                                            <label className="">Type</label>
                                            <select className=" w-full border-secondary border-[1px]  mt-[11px] md:mt-2 rounded py-1 px-1  focus:outline-green-600" value={type} onChange={(e)=> setType(e.target.value)} disabled> 
                                                <option value='1'>Standar</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='flex gap-10'>
                                        <div className="mt-4 w-full">
                                            <label className="">Rule Name</label>
                                            <input
                                                className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded py-1 px-1 focus:outline-green-600" value={ruleName} onChange={(e)=> setRuleName(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className='flex gap-10'>
                                        <div className="mt-4 w-1/2">
                                            <label className="">Risk Value</label>
                                            <input
                                                className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded py-1 px-1 focus:outline-green-600" value={riskValue} onChange={(e)=> setRiskValue(e.target.value)} type="number"/>
                                        </div>
                                        <div className="mt-4 w-1/2">
                                            <label className="">Status</label>
                                            <select  className=" w-full border-secondary border-[1px]  mt-[11px] md:mt-2 rounded py-1 px-1  focus:outline-green-600" value={status} onChange={(e)=> setStatus(e.target.value)} disabled>
                                                <option value='Active'>Active</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <label className="">Description</label>
                                        <input
                                            className=" w-full border-secondary border-[1px]  mt-[11px] md:mt-2 rounded py-1 px-1 focus:outline-green-600" value={description} onChange={(e)=> setDescription(e.target.value)}/>
                                    </div>
                                </div>
                        </div>
                        <div className="font-poppins flex justify-between px-5 pt-12">
                            <div className="w-1/2">
                                <span className="font-semibold">Active Period & Formula Generator</span>
                                {/* <p className="text-xs text-black text-opacity-50">lorem dakasdasfafasffsa
                                    aasfafa</p> */}
                            </div>
                                <div className="text-sm w-1/2">
                                    <div className='flex gap-10'>
                                        <div className="w-1/2">
                                            <label className="">Date In</label>
                                            <input
                                                className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded py-1 px-2 focus:outline-green-600"
                                                name='dateIn' type='date' value={dateFrom} onChange={(e)=> setDateFrom(e.target.value)}/>
                                        </div>
                                        <div className="w-1/2">
                                            <label className="">Date Out</label>
                                            <input
                                                className=" w-full border-secondary border-[1px] mt-[11px] md:mt-2 rounded py-1 px-2 focus:outline-green-600"
                                                name='dateOut' type='date' value={dateTo} onChange={(e)=> setDateTo(e.target.value)}/>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </form>
                    {/* <div className="flex justify-end py-4">
                        <button onClick={handleChangeTab}
                            className="py-1 px-6 border-[1px] border-secondary rounded-xl bg-secondary text-white">Next
                        </button>
                    </div> */}
                    </TabPane>
                    <TabPane tab="Formula" key="2">
                        <div className='h-full w-full grid grid-rows-2 p-3 gap-4'>
                            <DragDropContext onDragEnd={handleDragEnd}>
                            {_.map(state, (data, id) => {
                                // console.log(state);
                                    return (
                                        <div key={id} className="flex flex-col gap-4">
                                            <div className="flex justify-between items-center">
                                                <h3 className="font-poppins text-lg font-bold">{data.title}</h3>
                                                {data.title === "Formula Container" ? (
                                                <span>
                                                    <Button
                                                    className="bg-secondary hover:bg-opacity-90 text-white hover:text-white md:px-10 py-2 rounded-lg font-medium border-[1px] border-secondary text-xs text-center"
                                                    onClick={showModal}
                                                    >
                                                    <FontAwesomeIcon icon={faPlus} />
                                                      Add New Formula
                                                    </Button>
                                                    <Modal title="Formula" open={isModalOpen} onCancel={handleCancel} width={1000} footer={[null]}>
                                                    <div className='flex flex-col h-full'>
                                                        <Steps current={current} items={items} className='px-[10rem]' />
                                                            <div className='flex-1 flex-wrap' style={contentStyle}>{steps[current].content}</div>
                                                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px'}}>
                                                                {current > 0 && (
                                                                    <Button
                                                                        style={{ margin: '0 8px' }}
                                                                        onClick={() => prev()}
                                                                    >
                                                                        Previous
                                                                    </Button>
                                                                )}
                                                                {current < steps.length - 1 && (
                                                                    <Button type="primary" onClick={() => next()}>
                                                                        Next
                                                                    </Button>
                                                                )}
                                                            </div>
                                                    </div>
                                                    </Modal>
                                                </span>
                                                ) : (data.title === 'Studio Container' ? (
                                                <div className="flex gap-2">
                                                    <Button
                                                    className="bg-secondary hover:bg-opacity-90 text-white hover:text-white md:px-10 py-2 rounded-lg font-medium border-[1px] border-secondary text-xs text-center"
                                                    key="1"
                                                    onClick={() => {
                                                        handleClick("1");
                                                        incrementCounterOpr();
                                                    }}
                                                    >
                                                      &amp;
                                                    </Button>

                                                    <Button
                                                    className="bg-secondary hover:bg-opacity-90 text-white hover:text-white md:px-10 py-2 rounded-lg font-medium border-[1px] border-secondary text-xs text-center"
                                                    key="2"
                                                    onClick={() => {
                                                        handleClick("2");
                                                        incrementCounterOpr();
                                                    }}
                                                    >
                                                      ||
                                                    </Button>

                                                    <Button
                                                    className="bg-secondary hover:bg-opacity-90 text-white hover:text-white md:px-10 py-2 rounded-lg font-medium border-[1px] border-secondary text-xs text-center"
                                                    key="3"
                                                    onClick={() => {
                                                        handleClick("3");
                                                        incrementCounterOpr();
                                                    }}
                                                    >
                                                      (
                                                    </Button>

                                                    <Button
                                                    className="bg-secondary hover:bg-opacity-90 text-white hover:text-white md:px-10 py-2 rounded-lg font-medium border-[1px] border-secondary text-xs text-center"
                                                    key="4"
                                                    onClick={() => {
                                                        handleClick("4");
                                                        incrementCounterOpr();
                                                    }}
                                                    >
                                                      )
                                                    </Button>
                                                </div>
                                                ) : null)}
                                            </div>
                                            <Droppable droppableId={id}>
                                            {(provided) => {
                                                return (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.droppableProps}
                                                    className={"droppable-col"}
                                                >  
                                                    {data.items.map((el, index) => {
                                                    const int = String(el.conditionId);
                                                    return (
                                                        <Draggable key={int} index={index} draggableId={int}>
                                                        {(fProvided) => {
                                                            return (
                                                            <div
                                                                className={"item"}
                                                                ref={fProvided.innerRef}
                                                                {...fProvided.draggableProps}
                                                                {...fProvided.dragHandleProps}
                                                            >
                                                                {el.detailCondition}
                                                            </div>
                                                            );
                                                        }}
                                                        </Draggable>
                                                    );
                                                })}
                                                    {data.operators.map((opr, index) => {
                                                    const id = String(opr.id);
                                                    return (
                                                        <Draggable key={id} index={index} draggableId={id}>
                                                        {(fprovided) => {
                                                            return (
                                                                <>
                                                                {opr.text != null ? (
                                                                    <div
                                                                    className={"item"}
                                                                    ref={fprovided.innerRef}
                                                                    {...fprovided.draggableProps}
                                                                    {...fprovided.dragHandleProps}
                                                                >
                                                                    {opr.text}
                                                                </div>
                                                                ) : null}
                                                                {opr.detailCondition != null ? (
                                                                    <div
                                                                    className={"item"}
                                                                    ref={fprovided.innerRef}
                                                                    {...fprovided.draggableProps}
                                                                    {...fprovided.dragHandleProps}
                                                                >
                                                                    {opr.detailCondition}
                                                                </div>
                                                                ) : null}
                                                                </>

                                                            );
                                                        }}
                                                        </Draggable>
                                                    );
                                                    })}
                                                    {provided.placeholder}
                                                </div>
                                                );
                                            }}
                                            </Droppable>
                                        </div>
                                    )
                                })}
                            </DragDropContext>
                            <div className="flex justify-end py-4">
                                <button
                                    className="py-1 px-6 border-[1px] border-secondary rounded-xl bg-secondary text-white" type="submit" onClick={handleAddData}>Submit
                                </button>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    </Layout>
)
}

export default ScenarioBuilder