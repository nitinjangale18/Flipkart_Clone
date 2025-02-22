import { InputBase,Box,styled,List,ListItem } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
 import { getProducts } from "../../redux/actions/productActions";
import { Link } from "react-router-dom";

const SearchContainer=styled(Box)`
    background:#fff;
    border-radius:7px;
    width:38%;
    margin-left:10px;
    display:flex;
`

const InputSearchBase=styled(InputBase)`
    padding-left:20px;
    width:100%;
`

const ListWrapper = styled(List)`
  position: absolute;
  color: #000;
  background: #FFFFFF;
  margin-top: 36px;
`;

const SearchIconWrapper=styled(Box)`
color:blue;
padding:5px;
font-size:unset;
`

const Search=()=>{
    const [text, setText] = useState('');

    const getText=(text)=>{
        setText(text);
    }

    const {products}=useSelector(state=>state.getProducts);

    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(getProducts());
    },[dispatch])

    return(
        <SearchContainer>
     <InputSearchBase placeholder="Search for Product Brand and more" 
                    onChange={(e)=>getText(e.target.value)}
     />

     <SearchIconWrapper>
        <SearchIcon/>
      </SearchIconWrapper>

        {
            text && 
            <ListWrapper>
                {products
                    .filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase()))
                    .map(product => (
                    <Link to={`/products/${product.id}`}
                    onClick={()=>setText('')}
                    >

                    <ListItem key={product.id}>{product.title.longTitle}</ListItem>
                    </Link>
                    ))
                }
            </ListWrapper>
 
        }
      </SearchContainer>
     
    )
}

export default Search;